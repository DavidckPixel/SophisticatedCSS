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
            // Check if redirect was necessary
            if (req.query.ref) {
                const path = decodeURIComponent(req.query.ref as string);
                const valid = /^(\/[a-zA-Z0-9]+)+(.html)?$/;
                if (valid.test(path)) {
                    res.redirect(path);
                    return;
                }
            }

            // In all other cases, go to profile
            res.redirect('/profile');
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