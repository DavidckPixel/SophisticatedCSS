import commonPassword from "fxa-common-password-list";
import asyncHandler from "express-async-handler";
import { Express, Response } from "express";
import { body, validationResult } from "express-validator";
import { hash } from "argon2";
import { Database } from "../database";
import { Question, QuestionResponse, User, Quiz } from "../entities"
import { isAuthenticated } from "../security";
import QuizSession, { SessionWithQuiz } from "../session";

export default function register(app: Express, db: Database) {
    /**
     * Register a new user
     */
    app.get('/register', (req, res) => {
        res.render("register.html.ejs", { message: null });
    });
    
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
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
            .isStrongPassword().withMessage("Password must be combination of upper/lowercase letters, digits and symbols")
            .custom(password => !commonPassword.test(password)).withMessage("Password is too common")
            .custom((password, { req }) => password === req.body.confPassword).withMessage("Passwords don't match"),
        asyncHandler(async (req, res) => {
            // Validate input
            const errors = validationResult(req).formatWith(({ msg, param }) => `${param}: ${msg}`);
            if (!errors.isEmpty()) {
                return res.render("register.html.ejs", { message: errors.array().join(', ') })
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
            let session = req.session as SessionWithQuiz;
            await renderProfile(res, user, null, null, session);
        })
    );

    /**
     * Profile page edit form
     */
    app.post('/profile',
        isAuthenticated(),
        body('email')
            .if(body('email').exists())
            .isEmail()
            .normalizeEmail(),
        body('password')
            .if(body('password').exists())
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
            .isStrongPassword().withMessage("Password must be combination of upper/lowercase letters, digits and symbols")
            .custom(password => !commonPassword.test(password)).withMessage("Password is too common"),
        asyncHandler(async (req, res) => {
            let user = req.user as User;
            let session = req.session as SessionWithQuiz;
            let passwd = null;
            let email = null;

            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let firstErr = errors.mapped();
                if (firstErr['password']) {
                    passwd = firstErr['password'].msg;
                }
                if (firstErr['email']) {
                    email = firstErr['email'].msg;
                }
                return await renderProfile(res, user, passwd, email, session);
            }

            // Valid input, handle
            if(req.body.password){
                user.setPassword(await hash(req.body.password));
                passwd = "success";
            }
            else if(req.body.email){
                user.setEmail(req.body.email);
                email = "success";
            }

            await db.repository(User).update(user);
            await renderProfile(res, user, passwd, email, session);
        })
    );

    /**
     * Report update methods
     */
     async function getOverallReport(username : string) {
        let answerdata = db.repository(QuestionResponse);
        let questions = db.repository(Question);

        let questionsAnsweredByUser = await answerdata.findBy({user : username});
        let numberQuestionsAnswered = questionsAnsweredByUser.length;
        let numberQuestionsValid = 0;

        for (const response of questionsAnsweredByUser) {
            const question = await questions.find(response.getQuestion());
            if (question && response.getAnswer() === question.getCorrect()) {
                numberQuestionsValid++;
            }
        }

        let percentage = numberQuestionsValid / numberQuestionsAnswered * 100;

        //console.log("AnsweredQuestions : " + numberQuestionsAnswered + " / Questions : " + numberofQuestions + " Gives percentage = " + percentage);

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

    async function renderProfile(res: Response, user: User, password:any, email:any, session: SessionWithQuiz){
        let quizes = db.repository(Quiz)
        let overallpercentage = await getOverallReport(user.getUsername());
        let sessionpercentage = session.quiz ? session.quiz.questionValid / session.quiz.questionTotal * 100 : 0;
        var allquizforreport = await quizes.findAll();

        let allquizscores = await fillQuizScores(user.getUsername(), allquizforreport);

        res.render("profile.html.ejs", {
            message: {password, email},
            username: user.getUsername(),
            email: user.getEmail(),
            data: overallpercentage,
            sessiondata: sessionpercentage,
            allquizes:allquizforreport,
            allscores:allquizscores
        });
    }

}
