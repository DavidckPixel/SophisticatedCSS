#!/usr/bin/env node
import { Console } from "console";
import { verbose } from "sqlite3";
import Database from "../Database";
import * as Db from "../DataType";
import { Question, QuestionChoice, QuestionResponse, Quiz, Topic, User } from "../entities";
var fs = require("fs");
var file = "quiz.db";
var exists = fs.existsSync(file);

var sqlite3 = verbose();
var db = new Database(new sqlite3.Database(file));
db.register(Question, {
    id: Db.Primary(Db.String()),
    quizid: Db.Foreign({ entity: Quiz }),
    type: Db.String(),
    title: Db.String(),
    statement: Db.String(),
    correct: Db.String(),
})
db.register(QuestionChoice, {
    id: Db.Primary(Db.String()),
    question: Db.Foreign({ entity: Question }),
    statement: Db.String(),
    choiceValue: Db.String(),
})
db.register(QuestionResponse, {
    question: Db.Primary(Db.Foreign({ entity: Question })),
    user: Db.Primary(Db.Foreign({ entity: User })),
    answer: Db.String(),
})
db.register(Quiz, {
    id: Db.Primary(Db.String()),
    title: Db.String(),
    topicid: Db.Foreign({ entity: Topic }),
})
db.register(Topic, {
    id: Db.Primary(Db.String()),
    title: Db.String(),
    descriptor: Db.String(),
})
db.register(User, {
    username: Db.Primary(Db.String()),
    email: Db.String(),
    password: Db.String(),
});

(async() => {
    if (!exists) {
        await db.create();
    }

    const userRepo = db.repository(User);
    
    await userRepo.insert(new User("David", "David@Koymans", "test"));
    await userRepo.insert(new User("David2", "David@Koymans", "test"));

    const users = await userRepo.findAll();
    for (const user of users) {
        console.log(user.getUsername() + " : " + user.getPassword() + "  ==  " + user.getEmail());
    }

    db.close();
})();
