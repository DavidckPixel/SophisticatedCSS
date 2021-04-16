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

        let array : string[] = [];

        questions.forEach(question => {
            array.push(question.getId());
        });

        res.json(array);
    }));

    app.get('/assesment/:quizid/:id', asyncHandler(async (req, res) => {
        const questionRepository = db.repository(Question);
        const questions = await questionRepository.findBy({quizid: req.params.quizid, id: req.params.id});
        let question = questions[0];
        
        const replybody = 
        {id : question.getId(), 
        quizid : question.getQuizId(),
        type: question.getType(),
        title: question.getTitle(),
        statement: question.getStatement() };

        res.json(replybody);
    }));

    app.get("/MutlipleChoice/:id", asyncHandler(async (req, res) => {
        const questionChoiceRepository = db.repository(QuestionChoice);
        const choices = await questionChoiceRepository.findBy({question: req.params.id});

        res.json(choices);
    }));

    app.post('/assesment/:id', authenticated("Replying whether or not filled in answer is correct") ,asyncHandler(async (req, res) => {
        const questionRepository = db.repository(Question);
        const question = await questionRepository.find(req.params.id);

        if(question == null){
            res.status(500).send;
            return;
        }


        req.on('data', async(chunk) => {
            let data = JSON.parse(chunk);
            let answer;

            if(data.value == question.getCorrect()){
                answer = true;
            }
            else{ answer = false};

            if(req.user){
                let user : User = req.user as User;
                const questionReponse = db.repository(QuestionResponse);

                let bool = await questionReponse.findBy({question: question.getId(), user: user.getUsername()})

                if(bool.length <= 0){
                    await questionReponse.insert(new QuestionResponse(question.getId(), user.getUsername(), answer.toString()));
                }
                else
                {
                    bool[0].setAnswer(answer.toString());
                    await questionReponse.update(bool[0])
                }
            }

            res.json({answer: answer, explanation: question.getExplanation()})
            } 
        );
    }));
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