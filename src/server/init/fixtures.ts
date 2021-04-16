import { Database } from "../database";
import { Question, Quiz, Topic, User, QuestionResponse, QuestionChoice } from "../entities";
import { hash } from "argon2";
import { v4 as uuidv4 } from 'uuid';

export default async function fixtures(db: Database) {

    const topic1 = uuidv4();
    const topic2 = uuidv4();

    const quiz1 = uuidv4();
    const quiz2 = uuidv4();
    const quiz3 = uuidv4();
    const quiz4 = uuidv4();
    
    const question1 = uuidv4();
    const question3 = uuidv4();

    const question5 = uuidv4();
    const question6 = uuidv4();
    const question7 = uuidv4();

    const question9 = uuidv4();
    const question10 = uuidv4();
    const question11 = uuidv4();

    const question13 = uuidv4();
    const question14 = uuidv4();
    const question15 = uuidv4();

    await db.fixture(
        new Topic(topic1, "Preprocessors in general", "/index.html"),
        new Topic(topic2, "Different Preprocessors", "/sass.html"),
    );
    await db.fixture(
        new Quiz(quiz1, "History and working of preprocessors", topic1),
        new Quiz(quiz2, "Preprocessor risks and benifits", topic1),
        new Quiz(quiz3, "SASS", topic2),
        new Quiz(quiz4, "LESS", topic2),
    );
    await db.fixture(
        new Question(question1, quiz1, "multi", "Pre-processor identity", "Pre-processors are...", "Q1O2", "Preprocessors are scripting languages that extend the default capabilities of CSS"),
        new Question(question3, quiz1, "multi", "Pre-processor history", "In which year was the pre-processor that is considered to be the pioneer of CSS pre-processors introduced?", "Q3O3", "The pioneer was first introduced in 2006, followed by it's main rival in 2009"),
        new Question(uuidv4(), quiz1, "open", "Pre-processor pioneer", "Which pre-processor is considered to be the pioneer of CSS pre-processors?", "SASS", "Sass was considered the pioneer of pre-processors, Less was introduced only three years later"),

        new Question(question5, quiz2, "multi", "Pre-processor functions", "What is not a function of a pre-processor?", "Q5O1", "all code written with pre processor will be converted into CSS files and could have been written without pre-processors"),
        new Question(question6, quiz2, "multi", "Pre-processor risks", "What is a possible risk of using a preprocessor?", "Q6O4", "By using a preprocessor, your stylesheets will be written in a non-standard language, unsupported by browsers. This means that you're depending on the continued support for your preprocessor language of choice."),
        new Question(question7, quiz2, "multi", "Vendor lock-in", "What is 'vendor lock-in'?", "Q7O3", "Vendor lock-in means that you can't change the vendor anymore, when you've started with a pre-processor, you can't quit halfway through a project"),
        new Question(uuidv4(), quiz2, "open", "Pre-processor advantage", "Most preprocessors will add __A__ that don't exist in pure CSS. What does A stand for?", "functions", "The reason we're using CSS preprocessors is to add extra functionalities that CSS wouldn't otherwise have."),

        new Question(question9, quiz3, "multi", "Sass operators", "Which operator is not included in Sass?", "Q9O4", "The power operator is not included."),
        new Question(question10, quiz3, "multi", "Sass advantages", "What is an advantage of Sass?", "Q10O2", "Sass is a community driven stylesheet language that’s compiled to CSS. It was the first and is still the most popular"),
        new Question(question11, quiz3, "multi", "Sass disadvantages", "What is a disadvantage of Sass?", "Q11O1", "Well, it's true, and it can be very problematic"),
        new Question(uuidv4(), quiz3, "open", "Sass command line", "Using the command line, what must the programmer type to convert the file layout.scss to a css file called “generated”?", "sass layout.scss generated.css", "As Sass converts scss files into css files, this can be done through a variety of methods, the simplest one being the command line. The command begins with Sass, stating that it is a sass command, followed by the name of the file the user wants to convert, and lastly the name of the file that needs to be generated. so: sass layout.scss generated.css"),

        new Question(question13, quiz4, "multi", "Less meaning", "What does LESS stand for?", "Q13O4", "There isn't really much explanation nessecary for this, isn't it? You shoul've paid attention"),
        new Question(question14, quiz4, "multi", "Less advantages", "What is an advantage of LESS?", "Q14O2", "It's based on Sass, but adds a couple of features"),
        new Question(question15, quiz4, "multi", "Less disadvantages", "What is a disadvantage of LESS?", "Q1503", "It's all in the table, but key is that it just makes things more complex"),
        new Question(uuidv4(), quiz4, "open", "Less variable", "What symbol is used to define a variable in the pre-processor Less?", "@", "When defining a variable in less, the programmer does this with the @ symbol followed by the name of the variable, for Sass this is $")
    );
    await db.fixture(
        new QuestionChoice(uuidv4(), question1, "...not very usefull", "Q1O1"),
        new QuestionChoice(uuidv4(), question1, "...scripting languages", "Q1O2"),
        new QuestionChoice(uuidv4(), question1, "...a feature of CSS", "Q1O3"),
        new QuestionChoice(uuidv4(), question1, "...standardized", "Q1O4"),

        new QuestionChoice(uuidv4(), question3, "2012", "Q3O1"),
        new QuestionChoice(uuidv4(), question3, "2003", "Q3O2"),
        new QuestionChoice(uuidv4(), question3, "2006", "Q3O3"),
        new QuestionChoice(uuidv4(), question3, "2009", "Q3O4"),

        new QuestionChoice(uuidv4(), question5, "Make your site load faster", "Q5O1"),
        new QuestionChoice(uuidv4(), question5, "Make your code more readable", "Q5O2"),
        new QuestionChoice(uuidv4(), question5, "You have to write less code", "Q5O3"),
        new QuestionChoice(uuidv4(), question5, "Add more function\u200bality", "Q5O4"),

        new QuestionChoice(uuidv4(), question6, "Code get’s over\u200bcompli\u200bcated", "Q6O1"),
        new QuestionChoice(uuidv4(), question6, "Not all browsers will display your site correctly", "Q6O2"),
        new QuestionChoice(uuidv4(), question6, "Less function\u200bality then normal CSS", "Q6O3"),
        new QuestionChoice(uuidv4(), question6, "Depen\u200bdency on one pre-processor language", "Q6O4"),

        new QuestionChoice(uuidv4(), question7, "Problems with resolving bugs", "Q7O1"),
        new QuestionChoice(uuidv4(), question7, "Getting stuck on a site", "Q7O2"),
        new QuestionChoice(uuidv4(), question7, "Depen\u200bdency on one pre-processor", "Q7O3"),
        new QuestionChoice(uuidv4(), question7, "Losing all off your code because of updates", "Q7O4"),

        new QuestionChoice(uuidv4(), question9, "% operator (modulus)", "Q9O1"),
        new QuestionChoice(uuidv4(), question9, "+ operator (addition)", "Q9O2"),
        new QuestionChoice(uuidv4(), question9, "* operator (multipli\u200bcation)", "Q9O3"),
        new QuestionChoice(uuidv4(), question9, "^ operator (exponen\u200btiation)", "Q9O4"),

        new QuestionChoice(uuidv4(), question10, "It's not very advanced", "Q10O1"),
        new QuestionChoice(uuidv4(), question10, "It has a large community", "Q10O2"),
        new QuestionChoice(uuidv4(), question10, "It's the only pre-processor that can handle nesting", "Q10O3"),
        new QuestionChoice(uuidv4(), question10, "It doesn't have as many features", "Q10O4"),

        new QuestionChoice(uuidv4(), question11, "Most applications are paid", "Q11O1"),
        new QuestionChoice(uuidv4(), question11, "It doesn't have many features", "Q11O2"),
        new QuestionChoice(uuidv4(), question11, "It's quite complex to work with", "Q11O3"),
        new QuestionChoice(uuidv4(), question11, "It can't handle variables", "Q11O4"),

        new QuestionChoice(uuidv4(), question13, "Leaner Estimate Style Sheets", "Q13O1"),
        new QuestionChoice(uuidv4(), question13, "Learning Style Sheets", "Q13O2"),
        new QuestionChoice(uuidv4(), question13, "Less Energetic Style Sheets", "Q13O3"),
        new QuestionChoice(uuidv4(), question13, "Leaner Style Sheets", "Q13O4"),

        new QuestionChoice(uuidv4(), question14, "It's not as complex", "Q14O1"),
        new QuestionChoice(uuidv4(), question14, "It’s feature-rich", "Q14O2"),
        new QuestionChoice(uuidv4(), question14, "It's only server sided", "Q14O3"),
        new QuestionChoice(uuidv4(), question14, "It has the largest community of all pre-processors", "Q14O4"),

        new QuestionChoice(uuidv4(), question15, "It doesn't have that many features", "Q1501"),
        new QuestionChoice(uuidv4(), question15, "It's just stupid", "Q1502"),
        new QuestionChoice(uuidv4(), question15, "It uses scripts", "Q1503"),
        new QuestionChoice(uuidv4(), question15, "It isn't backwards compatible", "Q1504"),
    );
    await db.fixture(new User("David", "Davidc.Koymans@outlook.com", await hash("1234")));
}
