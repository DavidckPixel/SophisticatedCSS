import { Request, Response, NextFunction } from "express";
import { verify } from "argon2";
import { Database } from "./database";
import { User } from "./entities";

export function isAuthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    };
}

export function verifyCredentials(db: Database) {
    return async (username: string, password: string, done: any) => {
        const repository = db.repository(User);
        const user = await repository.find(username).catch((err) => done(err));
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!await verify(user.getPassword(), password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    };
}

export function serialize() {
    return (user: User, done: any) => {
        done(null, user.getUsername());
    };
}
  
export function deserialize(db: Database) {
    return async (id: string, done: any) =>  {
        const repository = db.repository(User);
        const user = await repository.find(id).catch((err) => done(err));
        done(null, user || null);
    };
}