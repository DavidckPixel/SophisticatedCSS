import { verbose } from "sqlite3";
import { Database, DataType as Db }  from "../database";
import { Question, QuestionChoice, QuestionResponse, Quiz, Topic, User } from "../entities";

const dbFile = "quiz.db";
const db = new Database(new (verbose()).Database(dbFile));

// Register all entities
db.register(Question, {
    id: Db.Primary(Db.String()),
    quizid: Db.Foreign({ entity: Quiz }),
    type: Db.String(),
    title: Db.String(),
    statement: Db.String(),
    correct: Db.String(),
    explanation: Db.String(),
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

export default db;
