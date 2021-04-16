import commonPassword from "common-password-checker";
import asyncHandler from "express-async-handler";
import { Express } from "express";
import { body, validationResult } from "express-validator";
import { hash } from "argon2";
import { renderFile } from "ejs";
import { Database } from "../database";
import { Question, QuestionResponse, User, Quiz } from "../entities"
import { isAuthenticated } from "../security";

export default function register(app: Express, db: Database) {
    /**
     * Register a new user
     */
    app.get('/register', asyncHandler(async (req, res) => {
        let html = await renderFile("template/register.html.ejs", { message: null })
        res.send(html);
    }));
    
    /**
     * Register a new user
     */
    app.post('/register',
        body('username')
            .not().isEmpty()
            .trim().escape()
            .custom(async username => {
                const repo = db.repository(User);
                const user = await repo.find(username);
                if (user) {
                    return Promise.reject();
                }
            }).withMessage('Username already exists'),
        body('email')
            .isEmail()
            .normalizeEmail(),
        body('password')
            .isStrongPassword()
            .custom(password => !commonPassword(password)).withMessage("Password is too common")
            .custom((password, { req }) => password === req.body.confPassword).withMessage("Passwords don't match"),
        asyncHandler(async (req, res) => {
            // Validate input
            const errors = validationResult(req).formatWith(({ msg, param }) => `${param}: ${msg}`);
            if (!errors.isEmpty()) {
                let html = await renderFile("template/register.html.ejs", { message: errors.array().join(', ') })
                return res.send(html);
            }

            // Valid input, handle
            const repo = db.repository(User);
            await repo.insert(new User(req.body.username, req.body.email, await hash(req.body.password)));
            res.redirect('/login');
        })
    );

    /**
     * profile page
     */
    app.get('/profile', 
        isAuthenticated(),
        asyncHandler(async (req, res) => {            
            let user = req.user as User;
            
            let username = user.getUsername();
            
            let html = await getTemplate(username, null, null);
            res.send(html);
        })
    );

    /**
     * Profile page edit form
     */
    app.post('/profile',
        isAuthenticated(),
        asyncHandler(async (req, res) => {
            
            let user = req.user as User;
            let username = user.getUsername();
            let html = await getTemplate(username, null, null);
            

            if(req.body.name="password"){
                user.setPassword(await hash(req.body.password));
                html = await getTemplate(username, "success", null);
            }
            else if(req.body.name="email"){
                user.setEmail(req.body.email);
                html = await getTemplate(username, null, "success");
            }

            await db.repository(User).update(user);
            res.send(html);  
        })
    );

    /**
     * Report update methods
     */
     async function getOverallReport(username : string) {
                let answerdata = db.repository(QuestionResponse);
                let questions = db.repository(Question);
                
                let allquestions = await questions.findAll();
                let numberofQuestions = allquestions.length;
                    
                let questionsAnsweredByUser = await answerdata.findBy({user : username});
                let numberQuestionsAnswered = questionsAnsweredByUser.length;

                let percentage = numberQuestionsAnswered / numberofQuestions * 100;

                return percentage;
    }

    async function getQuizReport(username : string, thisquiz: string) {
        let answerdata = db.repository(QuestionResponse);
        let questions = db.repository(Question);
        
        
        let questionsOfQuiz = await questions.findBy({quizid: thisquiz});
        let questionidArray: string[]= [];
        questionsOfQuiz.forEach(element => {
            let answer = element.getId()
            questionidArray.push(answer);
        })
        let numberofQuestions = questionsOfQuiz.length;
        
        let questionsAnsweredByUser = await answerdata.findBy({user : username});        
        let questionsAnsweredByUserThisQuiz = [];

        questionsAnsweredByUser.forEach(element1 => {
            let answeredid = element1.getQuestion();
            questionidArray.forEach(element2 => {
                if (answeredid == element2){
                    questionsAnsweredByUserThisQuiz.push(answeredid);
                }
            })
        })
        
        let numberQuestionsAnsweredThisQuiz = questionsAnsweredByUserThisQuiz.length;
        let percentage = 0;
        if(numberQuestionsAnsweredThisQuiz > 0) {
            percentage = numberQuestionsAnsweredThisQuiz / numberofQuestions * 100;
        }

        return percentage;
    }

    async function fillQuizScores(username: string, allquizforreport: Quiz[]){
        let data =  await Promise.all(allquizforreport.map(async element => await getQuizReport(username, element.getId())));
        return data;
    }

    async function getTemplate(username:string, password:any, email:any){
        let quizes = db.repository(Quiz)
        let overallpercentage = await getOverallReport(username);
        var allquizforreport = await quizes.findAll();

        let allquizscores = await fillQuizScores(username, allquizforreport);

        let html = await renderFile("template/profile.html.ejs", {message: {password, email}, data:overallpercentage, allquizes:allquizforreport, allscores:allquizscores});
        return html;
    }

}
