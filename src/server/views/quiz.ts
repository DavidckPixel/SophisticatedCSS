import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import ejs from "ejs";
import { Console } from "node:console";

export default function register(app: Express, db: Database) {
    /**
     * Load a question from the database
     * @param id The question id
     * @returns A JSON representation of the corresponding question
     */
    app.get('/assesment', asyncHandler(async (req, res) => {
        let html = await ejs.renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:50})
        res.send(html);
    }));
}