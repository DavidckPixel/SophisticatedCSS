import asyncHandler from "express-async-handler";
import { Express } from "express";
import { hash } from "argon2";
import { renderFile } from "ejs";
import { Database } from "../database";
import { User } from "../entities";
import { isAuthenticated } from "../security";

export default function register(app: Express, db: Database) {
    /**
     * profile page
     */
    app.get('/profile', 
        isAuthenticated(),
        asyncHandler(async (req, res) => {
            let html = await renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:50})
            res.send(html);
        })
    );

    /**
     * Profile page edit form
     */
    app.post('/profile',
        isAuthenticated(),
        asyncHandler(async (req, res) => {
            let user = req.user as User;
            let html = await renderFile("template/profile.html.ejs", {message: {password:null, email:null}});

            if(req.body.name="password"){
                user.setPassword(await hash(req.body.password));
                html = await renderFile("template/profile.html.ejs", {message: {password:"success", email:null}});
            }
            else if(req.body.name="email"){
                user.setEmail(req.body.email);
                html = await renderFile("template/profile.html.ejs", {message: {password:null, email:"success"}});
            }

            await db.repository(User).update(user);
            res.send(html);  
        })
    );
}