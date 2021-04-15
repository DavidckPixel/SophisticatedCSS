import { Database } from "../database";
import { Question, Quiz, Topic, User, QuestionResponse, QuestionChoice } from "../entities";
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
    await db.fixture(
        new Question("id1", "id1", "multi", "TestQuestion", "A question used during testing", "test"),
        new Question("id2", "id1", "multi", "TestQuestion", "A question used during testing", "test")
    );
    await db.fixture(
        new QuestionChoice("id1", "id1", "testQuestionChoice", "test"),
        new QuestionChoice("id2", "id1", "testQuestionChoice2", "test"),
    );
    await db.fixture(new User("David", "Davidc.Koymans@outlook.com", await hash("1234")));
    await db.fixture(new QuestionResponse("id1", "David", "test"));
}
