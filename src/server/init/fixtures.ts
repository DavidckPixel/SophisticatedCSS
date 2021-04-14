import { Database } from "../database";
import { Question, Quiz, Topic, User, QuestionResponse } from "../entities";
import { hash } from "argon2";

export default async function fixtures(db: Database) {
    await db.fixture(
        new Topic("id1", "TestTopic1", "A topic used during testing"),
        new Topic("id2", "TestTopic2", "A topic used during testing"),
    );
    await db.fixture(
        new Quiz("id1", "TestQuiz1", "id1"),
        new Quiz("id2", "TestQuiz2", "id1"),
        new Quiz("id3", "TestQuiz3", "id2"),
        new Quiz("id4", "TestQuiz4", "id2"),
    );
    await db.fixture(new Question("id1", "id1", "test", "TestQuestion", "A question used during testing", "test"));
    await db.fixture(new User("David", "Davidc.Koymans@outlook.com", await hash("1234")));
    await db.fixture(new QuestionResponse("id1", "David", "test"));
}
