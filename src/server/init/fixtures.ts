import { Database } from "../database";
import { Question, Quiz, Topic, User, QuestionResponse } from "../entities";
import { hash } from "argon2";

export default async function fixtures(db: Database) {
    await topicFixture(db);
    await quizFixture(db);
    await questionFixture(db);
    await userFixture(db);
    await questionResponseFixture(db);
}

async function topicFixture(db: Database) {
    const repository = db.repository(Topic);
    
    // Clear database table
    await repository.query(`DELETE FROM ${repository.table()}`);

    // Load fresh data
    return Promise.all([
        repository.insert(new Topic("id1", "TestTopic", "A topic used during testing")),
    ]);
}

async function quizFixture(db: Database) {
    const repository = db.repository(Quiz);

    // Clear database table
    await repository.query(`DELETE FROM ${repository.table()}`);

    // Load fresh data
    return Promise.all([
        repository.insert(new Quiz("id1", "TestQuiz", "id")),
    ]);
}

async function questionFixture(db: Database) {
    const repository = db.repository(Question);
    
    // Clear database table
    await repository.query(`DELETE FROM ${repository.table()}`);

    // Load fresh data
    return Promise.all([
        repository.insert(new Question("id1", "id1", "test", "TestQuestion", "A question used during testing", "test")),        
    ]);
}

async function questionResponseFixture(db: Database) {
    const repository = db.repository(QuestionResponse);
    
    // Clear database table
    await repository.query(`DELETE FROM ${repository.table()}`);

    // Load fresh data
    return Promise.all([
        repository.insert(new QuestionResponse("id1", "David", "test")),
    ]);
}

async function userFixture(db: Database){
    const repository = db.repository(User);
    
    // Clear database table
    await repository.query(`DELETE FROM ${repository.table()}`);

    // Load fresh data
    return Promise.all([
        repository.insert(new User("David", "Davidc.Koymans@outlook.com", await hash("1234")))
    ]);
}