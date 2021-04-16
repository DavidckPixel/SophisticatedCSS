import asyncHandler from "express-async-handler";
import { Express, Request, Response, NextFunction } from "express";
import { Database } from "../database";
import { Topic, Quiz, Question, QuestionChoice, QuestionResponse, User } from "../entities";

export default function register(app: Express, db: Database) {
    /**
     * Load a question from the database
     * @param id The question id
     * @returns A JSON representation of the corresponding question
     */
    app.get('/api/question/:id', asyncHandler(async (req, res) => {
        const repository = db.repository(Question);
        const question = await repository.find(req.params.id);
        res.json(question);
    }));

    app.get('/assesment/topics', asyncHandler(async (req, res) => {
        const topicRepository = db.repository(Topic);
        const topics = await topicRepository.findAll();
        res.json(topics);
    }));

    app.get('/assesment/topics/:id', asyncHandler(async (req, res) => {
        const quizRepository = db.repository(Quiz);
        const quizes = await quizRepository.findBy({topicid: req.params.id});
        res.json(quizes);
    }));

    app.get('/assesment/quizAmount/:quizid',asyncHandler(async (req, res) => { 
        const questionRepository = db.repository(Question);
        const questions = await questionRepository.findBy({quizid: req.params.quizid});
        res.json(questions.map(x => x.getId()));
    }));

    app.get('/assesment/:quizid/:id', asyncHandler(async (req, res) => {
        const questionRepository = db.repository(Question);
        const question = await questionRepository.findOneBy({quizid: req.params.quizid, id: req.params.id});
        
        if (!question) {
            return res.status(404);
        }

        res.json({
            id : question.getId(), 
            quizid : question.getQuizId(),
            type: question.getType(),
            title: question.getTitle(),
            statement: question.getStatement()
        });
    }));

    app.get("/MutlipleChoice/:id", asyncHandler(async (req, res) => {
        const questionChoiceRepository = db.repository(QuestionChoice);
        const choices = await questionChoiceRepository.findBy({question: req.params.id});
        res.json(choices);
    }));

    app.post('/assesment/:id',
        authenticated("Replying whether or not filled in answer is correct"),
        asyncHandler(async (req, res) => {
            const questionRepository = db.repository(Question);
            const question = await questionRepository.find(req.params.id);

            if(!question){
                return res.status(404);
            }

            let answer = req.body.value == question.getCorrect();
            if(req.user){
                let user = req.user as User;
                const questionReponse = db.repository(QuestionResponse);

                let bool = await questionReponse.findOneBy({question: question.getId(), user: user.getUsername()})

                if(!bool){
                    await questionReponse.insert(new QuestionResponse(question.getId(), user.getUsername(), answer.toString()));
                } else {
                    bool.setAnswer(answer.toString());
                    await questionReponse.update(bool)
                }
            }

            res.json({answer: answer, explanation: question.getExplanation()})
        })
    );
}

function authenticated(description : string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).setHeader("WWW-Authenticate", `Basic realm="${description}"`)
        }
    };
}