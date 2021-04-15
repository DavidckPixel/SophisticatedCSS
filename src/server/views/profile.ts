import asyncHandler from "express-async-handler";
import { Express } from "express";
import { body, validationResult } from "express-validator";
import { hash } from "argon2";
import { renderFile } from "ejs";
import { Database } from "../database";
import { Question, QuestionResponse, User } from "../entities"
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
        body('username').not().isEmpty().trim().escape().custom(async username => {
            const repo = db.repository(User);
            const user = await repo.find(username);
            if (user) {
                return Promise.reject('Username already exists');
            }
        }),
        body('email').isEmail().normalizeEmail(),
        body('password').not().isEmpty().custom((password, { req }) => password === req.body.confPassword).withMessage("Passwords don't match"),
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
            // let answerdata = db.repository(QuestionResponse);
            // let questions = db.repository(Question);
            
            // let allquestions = await questions.findAll();
            // let numberofQuestions = allquestions.length;
                
            // let questionsAnsweredByUser = await answerdata.findBy({user : "David"});
            // let numberQuestionsAnswered = questionsAnsweredByUser.length;

            // let percentage = numberQuestionsAnswered / numberofQuestions * 100;
            let user = req.user as User;
            let username = user.getUsername();
            let overallpercentage = await getOverallReport(username);

            let html = await renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:overallpercentage})
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
            let html = await renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:50});

            if(req.body.name="password"){
                user.setPassword(await hash(req.body.password));
                html = await renderFile("template/profile.html.ejs", {message: {password:"success", email:null}, data:50});
            }
            else if(req.body.name="email"){
                user.setEmail(req.body.email);
                html = await renderFile("template/profile.html.ejs", {message: {password:null, email:"success"}, data:50});
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
}