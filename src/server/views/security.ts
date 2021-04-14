import asyncHandler from "express-async-handler";
import { Express } from "express";
import { authenticate } from "passport";
import { renderFile } from "ejs";
import { Database } from "../database";

export default function register(app: Express, db: Database) {
    /**
     * Login form
     */
    app.get('/login', asyncHandler(async (req, res) => {
        let html = await renderFile("template/login.html.ejs", {message: null})
        res.send(html);
    }));

    /**
     * Login form, user posted their login to the server
     */
    app.post('/login',
        authenticate('local', { failureRedirect: '/login' }),
        asyncHandler(async (req, res) => {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.json({ respond: "Login succesfull" })
        })
    );
      
    /**
     * Logout
     */
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });
}