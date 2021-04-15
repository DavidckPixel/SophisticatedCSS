import { Express } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import morgan from "morgan";
import bodyparser from "body-parser";
import helmet from "helmet";
import { Database } from "../database";
import { verifyCredentials, serialize, deserialize } from "../security"; 

export default function middleware(app: Express, db: Database): Express {
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(bodyparser());
    app.use(session({ secret: 'ThisIsNotSoSecret', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Security
    passport.use(new LocalStrategy(verifyCredentials(db)));
    passport.serializeUser(serialize() as (user: any, done: any) => void);
    passport.deserializeUser(deserialize(db));

    return app;
}