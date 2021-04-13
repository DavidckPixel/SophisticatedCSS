import express, { Express } from "express";
import { Database } from "../database";
import registerApi from "../views/api";
import registerSecurity from "../views/security";
import registerProfile from "../views/profile";
import bodyparser from "body-parser";

export default function router(db: Database): Express {
    const app = express();

    // Static content
    app.use(express.static('public')); 
    app.get( "/dist/index.js", ( req, res ) => {
        res.sendFile( "dist/index.js", { root: '.' } );
    } );
    app.use(bodyparser());

    // Dynamic content
    registerApi(app, db);
    registerSecurity(app, db);
    registerProfile(app,db);

    return app;
}
