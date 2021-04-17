import express, { Express } from "express";
import { Database } from "../database";
import registerApi from "../views/api";
import registerSecurity from "../views/security";
import registerUser from "../views/user";
import registerQuiz from "../views/quiz";
import middleware from "./middleware";

export default function router(db: Database): Express {
    const app = express();

    // Static content
    app.use(express.static('public')); 
    app.get( "/dist/index.js", ( req, res ) => {
        res.sendFile( "dist/index.js", { root: '.' } );
    } );

    // Load middleware
    middleware(app, db);

    // Dynamic content
    registerApi(app, db);
    registerSecurity(app, db);
    registerUser(app,db);
    registerQuiz(app,db);

    return app;
}
