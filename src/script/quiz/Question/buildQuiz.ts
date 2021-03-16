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

    /** section HTML element for the introBlock */
    const assesmentIntro = create("section", { "classList": "intro container" },
        create("img", { "classList": "intro__img", "src": "src/image/testimage.png" }),
        create("div", { "classList": "intro__text" },
            create("h1", { "classList": "intro__header" }, text("Test Your knowledge!")),
            create("p", { "classList": "intro__paragraph" }, text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.."))
        )
    )

    /** main body HTML element of assesment page */
    const totalAssessment = document.querySelector('#totalAssesment');
    totalAssessment?.appendChild(assesmentIntro);
}

/**
 * Create a HTML element node with properties and children
 * 
 * @param type The HTML element type.
 * @param props An object containing the properties for the element.
 * @param children The child nodes for the element.
 */
function create(type: string, props?: any, ...children: Node[]): HTMLElement {
    // Create element
    let el = document.createElement(type);

    // Assign properties
    Object.assign(el, props);

    // Add children
    for (const child of children) {
        el.appendChild(child);
    }

    // Finally return new element
    return el;
}

/**
 * Shorthand for document.createTextNode
 * 
 * @param content The text content for the node.
 */
function text(content: string): Text {
    return document.createTextNode(content);
}

function createEventObj(eventType : string, func : any, bool : boolean, el : HTMLElement) : HTMLElement {;
    el.addEventListener(eventType,func, bool);
    return el;
}
