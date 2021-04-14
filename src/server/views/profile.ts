import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import * as argon2 from "argon2";
import { User } from "../entities"
import ejs from "ejs";
import { error } from "node:console";

export default function register(app: Express, db: Database) {
    /**
     * profile page
     */
    app.get('/profile',asyncHandler(async (req, res) => {
        let html = await ejs.renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:50})
        res.send(html);
    }));

    /**
     * Profile page edit form
     */
    app.post('/profile', asyncHandler(async (req, res) => {

        let data = db.repository(User);
        let user = await data.find("David");
        let html = await ejs.renderFile("template/profile.html.ejs", {message: {password:null, email:null}, data:50});

        if(!user){
            return; //Better dealing
        }

        if(req.body.name="password"){
            user.setPassword(await argon2.hash(req.body.password));
            html = await ejs.renderFile("template/profile.html.ejs", {message: {password:"success", email:null}, data:50});
        }
        else if(req.body.name="email"){
            user.setEmail(req.body.email);
            html = await ejs.renderFile("template/profile.html.ejs", {message: {password:null, email:"success"}, data:50});
        }

        data.update(user);
        res.send(html);

        
    }));
}