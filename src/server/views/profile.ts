import asyncHandler from "express-async-handler";
import { Express } from "express";
import { hash } from "argon2";
import { renderFile } from "ejs";
import { Database } from "../database";
import { Question, QuestionResponse, User, Quiz } from "../entities"
import { isAuthenticated } from "../security";

export default function register(app: Express, db: Database) {
    /**
     * profile page
     */
    app.get('/profile', 
        isAuthenticated(),
        asyncHandler(async (req, res) => {            
            let user = req.user as User;
            let quizes = db.repository(Quiz)
            let username = user.getUsername();
            let overallpercentage = await getOverallReport(username);

            var allquizforreport = await quizes.findAll();

            let html = await renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:overallpercentage, allquizes:allquizforreport})
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

    async function getQuizReport(username : string, thisquiz: string) {
        let answerdata = db.repository(QuestionResponse);
        let questions = db.repository(Question);
        
        
        let questionsOfQuiz = await questions.findBy({quizid: thisquiz});
        let questionidArray: (() => string)[] = [];
        questionsOfQuiz.forEach(element => {
            questionidArray.push(element.getId);
        })
        let numberofQuestions = questionsOfQuiz.length;
            
        
        let questionsAnsweredByUser = await answerdata.findBy({user : username});        
        let questionsAnsweredByUserThisQuiz = [];

        questionsAnsweredByUser.forEach(element1 => {
            let answeredid = element1.getQuestion;
            questionidArray.forEach(element2 => {
                if (answeredid == element2){
                    questionsAnsweredByUserThisQuiz.push(answeredid);
                }
            })
        })
        let numberQuestionsAnsweredThisQuiz = questionsAnsweredByUserThisQuiz.length;

        let percentage = numberQuestionsAnsweredThisQuiz / numberofQuestions * 100;

        return percentage;
}

    

}
