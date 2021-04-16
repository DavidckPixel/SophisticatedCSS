import { Express } from "express";
import { Database } from "../database";

export default function register(app: Express, db: Database) {
    /**
     * Load a question from the database
     * @param id The question id
     * @returns A JSON representation of the corresponding question
     */
    app.get('/assesment', (req, res) => {
        res.render("profile.html.ejs", {message: {password:null, email:null}, data:50})
    });
}