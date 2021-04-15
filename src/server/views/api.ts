import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import { Topic, Quiz, Question, QuestionChoice, QuestionResponse } from "../entities";

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

    app.get('/assesment/:quizid/:id', asyncHandler(async (req, res) => {
        console.log("YOUR VARIABLES ARE: " + req.params.quizid +  " " +req.params.id);

        const questionRepository = db.repository(Question);
        const question = await questionRepository.findBy({quizid: req.params.quizid, id: req.params.id});

        res.json(question[0]);
    }));

    app.get("/MutlipleChoice/:id", asyncHandler(async (req, res) => {
        const questionChoiceRepository = db.repository(QuestionChoice);
        const choices = await questionChoiceRepository.findBy({question: req.params.id});

        console.log("UR CHOICES: " + choices)

        res.json(choices);
    }));
}