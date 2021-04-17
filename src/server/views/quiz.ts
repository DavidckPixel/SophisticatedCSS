import asyncHandler from "express-async-handler";
import { Express } from "express";
import { authenticate } from "passport";
import { Database } from "../database";

export default function register(app: Express, db: Database) {
    app.get('/quiz', asyncHandler(async (req, res) => {
        res.render("quiz.html.ejs", {login : req.isAuthenticated()})
    }))
}