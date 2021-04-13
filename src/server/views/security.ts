import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import * as argon2 from "argon2";
import { User } from "../entities"
import ejs from "ejs";
import { error } from "node:console";

export default function register(app: Express, db: Database) {
    /**
     * Login form
     */
    app.get('/login',asyncHandler(async (req, res) => {
        let html = await ejs.renderFile("template/login.html.ejs", {message: null})
        res.send(html);
    }));

    /**
     * Login form, user posted their login to the server
     */
    app.post('/login', asyncHandler(async (req, res) => {
        //res.json(req.body);

        let data = db.repository(User);
        let user = await data.find(req.body.username);

        if(!user){
            let html = await ejs.renderFile("template/login.html.ejs", {message: "unknown user"})
            res.send(html);
            return;
        }
        if (await argon2.verify(user.getPassword(),req.body.password)){
            res.json({responde:"Login succesfull"})
        }
        else{
            let html = await ejs.renderFile("template/login.html.ejs", {message: "incorrect password"})
            res.send(html);
        }
    }));
}