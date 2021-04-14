import { Database } from "../database";
import { Question, Quiz, Topic, User, QuestionResponse } from "../entities";
import { hash } from "argon2";

export default async function fixtures(db: Database) {
    await db.fixture(new Topic("id1", "TestTopic", "A topic used during testing"));
    await db.fixture(new Quiz("id1", "TestQuiz", "id"));
    await db.fixture(new Question("id1", "id1", "test", "TestQuestion", "A question used during testing", "test"));
    await db.fixture(new User("David", "Davidc.Koymans@outlook.com", await hash("1234")));
    await db.fixture(new QuestionResponse("id1", "David", "test"));
}
