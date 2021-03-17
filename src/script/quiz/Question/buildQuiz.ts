/// <reference path="../../nodes.ts" />
/// <reference path="./allquestions.ts" />
/// <reference path="./multiplechoice.ts" />
/// <reference path="./question.ts" />
/// <reference path="./open.ts" />

function buildQuiz() {
    /** base HTML element for the body of the assesment page, id = "totalAssesment" */
    const totalAssessment = create("article", {"id": "totalAssesment", "selectorTitle": "Quiz"});
    totalAssessment.setAttribute("selectorTitle", "Quiz");
    /** The body of HTML page*/
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    body?.insertBefore(totalAssessment, footer);

    buildIntro();

    /** Array that holds all the question objects */
    let allQuestionObjects: Array<Question> = [];

    for (let x = 0; x < allQuestions.length && x < 5; x++) {
        /** Local variable that stores the temporary question information */
        const thisQuestion = allQuestions[x];    

        if (thisQuestion.questionType == "multiplechoice") {
            allQuestionObjects.push(new Multiplechoice(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.allAnswers, thisQuestion.explanation, x, thisQuestion.link));

        }
        else if (thisQuestion.questionType == "open") {
            allQuestionObjects.push(new Open(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation, thisQuestion.link));
        }
    }
}

function buildIntro() {

    /** section HTML element for the introBlock */
    const assesmentIntro = create("section", { "classList": "intro container", "id": "introduction", "selectorTitle": "Introduction" }, 
        create("img", { "classList": "intro__img", "src": "src/image/testimage.png" }),
        create("div", { "classList": "intro__text"},
            create("h1", { "classList": "intro__header" }, text("Test Your knowledge!")),
            create("p", { "classList": "intro__paragraph" }, text("on this page you can test your knowledge about pre processors! all information about the topics in this quiz can be found on the website. After u filled in the answer, it will give a short explanation why the answer was right (or wrong) combined with a link to where this information could be found."))
        )
    );

    assesmentIntro.setAttribute("selectorTitle", "Introduction");
    
    /** main body HTML element of assesment page */
    const totalAssessment = document.querySelector('#totalAssesment');
    totalAssessment?.appendChild(assesmentIntro);
}
