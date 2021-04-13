import asyncHandler from "express-async-handler";
import { Express } from "express";
import { Database } from "../database";
import * as argon2 from "argon2";
import { User } from "../entities"


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
        //res.json(req.body);

        let data = db.repository(User);
        let user = await data.find(req.body.username);

        if(!user){
            res.json({responde:"unkown user"})
            return;
        }

        try{
            if (await argon2.verify(user.getPassword(),req.body.password.hashCode())){
                res.json({responde:"Login succesfull"})
            }
            else{
                res.json({responde:"wrong password"})
            }
        }catch(err){

        }
    }));
}