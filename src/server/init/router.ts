import express, { Express } from "express";
import { Database } from "../database";

export default function router(db: Database): Express {
    const app = express();

    // Static content
    app.use(express.static('public')); 
    app.get( "/dist/index.js", ( req, res ) => {
        res.sendFile( "dist/index.js", { root: '.' } );
    } );

    // Dynamic content
    // todo

    return app;
}
