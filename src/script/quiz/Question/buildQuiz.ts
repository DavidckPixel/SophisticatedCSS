/// <reference path="./allquestions.ts" />
/// <reference path="./multiplechoice.ts" />
/// <reference path="./question.ts" />

function buildQuiz() {

    const totalAssessment = document.createElement("article");
    totalAssessment.id = "totalAssesment";

    const body = document.querySelector("body");
    body?.appendChild(totalAssessment);

    buildIntro();

    for (let x = 0; x < allQuestions.length && x < 5; x++) {
        //for each question you want to build

        const thisQuestion = allQuestions[x];
        let newQuestion;
        //let newQuestion = new Question(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation, "test")        
        if (thisQuestion.questionType == "multiplechoice") {
            //if it's a multiplechoice question
            newQuestion = new Multiplechoice(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.allAnswers, thisQuestion.explanation, x);

        }
        else if (thisQuestion.questionType == "open") {
            //if it's a open question
            newQuestion = new Open(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation);
        }
    }
}

function buildIntro() {
    const assesmentIntro = document.createElement("section");
    assesmentIntro.classList.add("intro");
    assesmentIntro.classList.add("container");
    const assesmentIntroImage = document.createElement("img");
    assesmentIntroImage.classList.add("intro__img");
    assesmentIntroImage.src = "src/image/testimage.png";
    const assesmentIntroText = document.createElement("div");
    assesmentIntroText.classList.add("intro__text");

    const assesmentIntroTextHeader = document.createElement("h1");
    const assesmentIntroTextHeaderFill = document.createTextNode("Test Your knowledge!");
    assesmentIntroTextHeader.appendChild(assesmentIntroTextHeaderFill);
    assesmentIntroTextHeader.classList.add("intro__header");

    const assesmentIntroTextParagraph = document.createElement("p");
    const assesmentIntroTextParagraphFill = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..");
    assesmentIntroTextParagraph.appendChild(assesmentIntroTextParagraphFill);
    assesmentIntroTextParagraph.classList.add("intro__paragraph");

    assesmentIntroText.appendChild(assesmentIntroTextHeader);
    assesmentIntroText.appendChild(assesmentIntroTextParagraph);

    assesmentIntro.appendChild(assesmentIntroImage);
    assesmentIntro.appendChild(assesmentIntroText);

    const totalAssessment = document.querySelector('#totalAssesment');
    totalAssessment?.appendChild(assesmentIntro);
}
