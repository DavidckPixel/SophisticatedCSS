/// <reference path="./allquestions.ts" />
/// <reference path="./multiplechoice.ts" />
/// <reference path="./question.ts" />

function buildQuiz() {
    /** base HTML element for the body of the assesment page, id = "totalAssesment" */
    const totalAssessment = document.createElement("article");
    totalAssessment.id = "totalAssesment";

    /** The body of HTML page*/
    const body = document.querySelector("body");
    body?.appendChild(totalAssessment);

    buildIntro();

    /** Array that holds all the question objects */
    var allQuestionObjects: Array<Question>
    allQuestionObjects = []

    for (var x = 0; x < allQuestions.length && x < 5; x++) {
        /** Local variable that stores the temporary question information */
        const thisQuestion = allQuestions[x];    

        if (thisQuestion.questionType == "multiplechoice") {
            allQuestionObjects.push(new Multiplechoice(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.allAnswers, thisQuestion.explanation, x));

        }
        else if (thisQuestion.questionType == "open") {
            allQuestionObjects.push(new Open(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation));
        }
    }
}

function buildIntro() {

    /**  section HTML element for the introBlock*/
    const assesmentIntro = document.createElement("section");
    assesmentIntro.classList.add("intro");
    assesmentIntro.classList.add("container");

    /** img HTML element for intro image */
    const assesmentIntroImage = document.createElement("img");
    assesmentIntroImage.classList.add("intro__img");
    assesmentIntroImage.src = "src/image/testimage.png";

    /** div HTML element for intro text */
    const assesmentIntroText = document.createElement("div");
    assesmentIntroText.classList.add("intro__text");

    textTypeBuilder("h1", "intro_header", "Test Your knowledge!", assesmentIntroText);
    textTypeBuilder("p", "intro_paragraph", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..", assesmentIntroText);

    assesmentIntro.appendChild(assesmentIntroImage);
    assesmentIntro.appendChild(assesmentIntroText);

    /** main body HTML element of assesment page*/
    const totalAssessment = document.querySelector('#totalAssesment');
    totalAssessment?.appendChild(assesmentIntro);
}

/** Generic function to return text objects*/
function textTypeBuilder(tagType : string, classList : string, text : string, parentHTML : HTMLElement){
    var bodyHTML = document.createElement(tagType);
    bodyHTML.classList.add(classList);
    bodyHTML.appendChild(document.createTextNode(text));
    parentHTML.appendChild(bodyHTML);
}
