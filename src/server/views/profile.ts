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
