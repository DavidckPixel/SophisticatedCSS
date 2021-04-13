import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";

export default function register(app: Express, db: Database) {
    /**
     * Login form
     */
    app.get('/login', (req, res) => {
        res.sendFile( "template/login.html", { root: '.' } );
    });

    /**
     * Login form, user posted their login to the server
     */
    app.post('/login', asyncHandler(async (req, res) => {
        // todo: check whether user logged in correctly
    }));
}