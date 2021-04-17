import express, { Express } from "express";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import { Database } from "../database";
import { verifyCredentials, serialize, deserialize } from "../security"; 

export default function middleware(app: Express, db: Database): Express {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, '/../../../access.log'), { flags: 'a' })

    app.set("view engine", "ejs");
    app.use(helmet());
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(express.json())
    app.use(express.urlencoded());
    app.use(session({ secret: 'ThisIsNotSoSecret', resave: false, saveUninitialized: false, cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // Security
    passport.use(new LocalStrategy(verifyCredentials(db)));
    passport.serializeUser(serialize() as (user: any, done: any) => void);
    passport.deserializeUser(deserialize(db));

    return app;
}