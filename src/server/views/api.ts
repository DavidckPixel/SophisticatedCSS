import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import { Question } from "../entities";

export default function register(app: Express, db: Database) {
    /**
     * Load a question from the database
     * @param id The question id
     * @returns A JSON representation of the corresponding question
     */
    app.get('/api/question/:id', asyncHandler(async (req, res) => {
        const repository = db.repository(Question);
        const question = await repository.find(req.params.id);
        res.send(JSON.stringify(question));
    }));
}