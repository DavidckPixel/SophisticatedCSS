"use strict";

/// ../src/script/style/Selector/SelectorBuilder

/**
 * Component selector data builder
 */
class SelectorBuilder {
    constructor() {
        this.elements = [];
    }

    /**
     * Find and append DOM elements to the element cache if they have an id assigned.
     *
     * @param rootElement The HTML element whose children should be searched.
     * @param depth The relative depth of the searched children.
     */
    buildFor(rootElement, depth = 0) {
        // Iterate over all children
        for (const element of rootElement.children) {
            // Type guard for HTMLElement
            if (!(element instanceof HTMLElement))
                throw new Error(`Expected element to be an HTMLElement, was ${element?.constructor?.name ?? element}`);
            
            // Detect egligable elements and add them to the elements cache
            let title = element.getAttribute("selectorTitle");
            let childDepth = depth;
            if (title) {
                childDepth++;
                this.elements.push([element, title, depth]);
            }

            // Recursively call
            this.buildFor(element, childDepth);
        }
    }

    /**
     * Finds a builds a menu representation of a certain element and their children.
     *
     * @param rootElement The element that should be searched recursively.
     */
    build(rootElement) {
        // Build result
        this.buildFor(rootElement);
        const result = this.elements;

        // Clear data and return result
        this.elements = [];
        return result;
    }
}

/// ../src/script/nodes

/**
 * Create a HTML element node with properties and children
 *
 * @param type The HTML element type.
 * @param props An object containing the properties for the element.
 * @param children The child nodes for the element.
 */
function create(type, props, ...children) {
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
function text(content) {
    return document.createTextNode(content);
}

/**
 * Additon to create function by adding eventListener
 *
 * @param eventType Type of event
 * @param func  Function to be executed when event occurs
 * @param bool  True/False variable
 * @param el HTMLElement towhich eventlistener will be added
 * @returns HTMLElement containing eventlistener
 */
function createEventObj(eventType, func, bool, el) {
    el.addEventListener(eventType, func, bool);
    return el;
}

/// ../src/script/style/Selector/SelectorRenderer

/**
 * Component selector menu builder
 */
class SelectorRenderer {
    constructor(elements) {
        this.elements = elements;
    }

    /**
     * Set the currently selected menu item.
     *
     * @param el The HTML element that's being selected (not the button, the element that's represented by the button).
     */
    setElement(selector, element) {
        const indicator = " ←";

        // Revert title of previously selected element
        if (this.current) {
            const [prevSelector, _] = this.current;
            const textNode = prevSelector.childNodes[0];
            const textContent = textNode.textContent;

            // If string ends with indicator marking, remove it
            if (textContent === null || textContent === void 0 ? void 0 : textContent.endsWith(indicator)) {
                textNode.nodeValue = textContent.slice(0, textContent.length - indicator.length);
            }
        }

        // Set currently selected element
        this.current = [selector, element];

        // Change title of new selected element
        selector.childNodes[0].textContent += indicator;
    }

    /**
     * Render the menu, by appending a representation to the DOM.
     *
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement) {
        // Iterate over all elements in the menu
        for (const [element, title, depth] of this.elements) {
            // Prepare node values
            let fullTitle = "\u2003".repeat(depth) + title;

            // Create node
            let node = create("button", { "classList": "styleModifierElement__selectorText" }, text(fullTitle));
            node.addEventListener("click", (event) => {
                this.setElement(node, element);
            });

            // Add node to DOM
            rootElement.appendChild(node);
        }
    }
}

/// ../src/script/style/Style/BaseStyleRenderer

/**
 * Base class for style editing menus
 */
class BaseStyleRenderer {
    constructor(selector) {
        this.selector = selector;
    }

    updateModifier(el, modifier, allModifs) {
        // Find all modifier classes that are applied by this menu and remove them
        const removal = [...el.classList].filter(cls => allModifs.some(modif => cls.endsWith(modif)));
        for (const cls of removal) {
            el.classList.remove(cls);
        }

        // Add modifier copy to all classes
        if (modifier) {
            // Select all classes that are not BEM modifiers
            for (const cls of [...el.classList].filter(x => !x.includes("--"))) {
                el.classList.add(cls + modifier);
            }
        }

        // Run recursively
        for (const node of el.children) {
            this.updateModifier(node, modifier, allModifs);
        }
    }
}

/// ../src/script/style/Selector/TextStyleRenderer

/**
 * TextStyle selector menu builder
 */
class TextStyleRenderer extends BaseStyleRenderer {
    /**
     * Render the menu, by appending a representation to the DOM.
     *
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement) {
        const selectors = [
            ["Large", "--large", "20px"],
            ["Medium", null, "16px"],
            ["Small", "--small", "12px"],
        ];
        rootElement.classList.add("styleModifierElement--thin");

        const allModifs = selectors.map(([_, x]) => x).filter((x) => x !== null);
        
        // Iterate over all elements in the menu
        for (const [title, modifier, fontSize] of selectors) {
            // Build and append the node
            let node = create("button", { "classList": "styleModifierElement__selectorText", "style": "font-size:" + fontSize }, text(title));
            node.addEventListener("click", (event) => {
                // If a page element is selected
                if (this.selector.current) {
                    const [_, el] = this.selector.current;
                    this.updateModifier(el, modifier, allModifs);
                }
            });
            rootElement.appendChild(node);
        }
    }
}

/// ../src/script/style/Style/ColorStyleRenderer

/**
 * ColorStyle selector menu builder
 */
class ColorStyleRenderer extends BaseStyleRenderer {
    /**
     * Render the menu, by appending a representation to the DOM.
     *
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement) {
        const selectors = [
            ["Default colors", null],
            ["Inverted colors", "--invert"],
        ];

        rootElement.classList.add("styleModifierElement--thin");

        const allModifs = selectors.map(([_, x]) => x).filter((x) => x !== null);
        
        // Iterate over all elements in the menu
        for (const [title, modifier] of selectors) {
            // Build and append the node
            let node = create("button", { "classList": "styleModifierElement__selectorText" }, text(title));
            node.addEventListener("click", (event) => {
                // If a page element is selected
                if (this.selector.current) {
                    const [_, el] = this.selector.current;
                    this.updateModifier(el, modifier, allModifs);
                }
            });
            rootElement.appendChild(node);
        }
    }
}

/// ../src/script/quiz/Question/allquestions

/** array containing all questions in text form */
const allQuestions = [
    {
        "questionType": "multiplechoice",
        "title": "Which operator is not included in Sass?",
        "correctAnswer": "^ operator (exponen\u200btiation)",
        "explanation": "The power operator is not included.",
        "allAnswers": ["* operator (multipli\u200bcation)", "+ operator (addition)", "% operator (modulus)", "^ operator (exponen\u200btiation)"],
        "link": "sass.html#feature3"
    },
    {
        "questionType": "multiplechoice",
        "title": "What is not a function of a pre-processor?",
        "correctAnswer": "Make your site load faster",
        "explanation": "all code written with pre processor will be converted into CSS files and could have been written without pre Processors",
        "allAnswers": ["Make your code more readable", "Make your site load faster", "You have to write less code", "Add more function\u200bality"],
        "link": "index.html#details"
    },
    {
        "questionType": "multiplechoice",
        "title": "What is a possible risk of using a preprocessor?",
        "correctAnswer": "Depen\u200bdency on one pre-processor language",
        "explanation": "By using a preprocessor, your stylesheets will be written in a non-standard language, unsupported by browsers. This means that you're depending on the continued support for your preprocessor language of choice. In practice, these preprocessors are open source and the lifetime of a project usually is smaller than the lifetime of a preprocessor, but it's a factor to consider.",
        "allAnswers": ["Less function\u200bality then normal CSS", "Code get’s over\u200bcompli\u200bcated", "Depen\u200bdency on one pre-processor language", "Not all browsers will display your site correctly"],
        "link": "index.html#risks"
    },
    {
        "questionType": "open",
        "title": "What symbol is used to define a variable in the pre-processor Less?",
        "correctAnswer": "@",
        "explanation": "When defining a variable in less, the programmer does this with the @ symbol followed by the name of the variable",
        "allAnswers": [],
        "link": "less.html#feature1"
    },
    {
        "questionType": "open",
        "title": "Using the command line, what must the programmer type to convert the file layout.scss to a css file called “generated”?",
        "correctAnswer": "sass layout.scss generated.css",
        "explanation": "As Sass converts scss files into css files, this can be done through a variety of methods, the simplest one being the command line. The command begins with Sass, stating that it is a sass command, followed by the name of the file the user wants to convert, and lastly the name of the file that needs to be generated. so: sass layout.scss generated.css",
        "allAnswers": [],
        "link": "sass.html#link"
    }
];

/// ../src/script/quiz/Question/question

class Question {
    constructor(answer, question, explanation, link) {

        //INITIALIZE SOME BASE VALUES
        this.answer = answer;
        this.question = question;
        this.explanation = explanation;

        //Create HTMLElement for when answer is still unrevealed, add event listener to it so check() function is called,
        //Element is of type input
        this.undefAnswerBlock = createEventObj("click", this.check.bind(this), false, create("input", { "classList": "checkBlock__button checkBlock--center", "type": "button", "value": "Check!" }));
        
        //Create HTMLElement for the checkblock, add undefAnswerBlock into it
        //Add checkBLock into new HTMLElement for questionOptionsBlock
        this.checkBlock = create("div", { "classList": "checkBlock blackBlock" }, this.undefAnswerBlock);
        this.questionOptionsBlock = create("div", { "classList": "container" }, this.checkBlock);
        
        //Create HTML Element for Entire question 
        //  -MainBlock
        //      -Title Block
        //          -TitleBlock text
        //              -Contains question
        //      -QuestionOptionsBlock
        this.questionBlock = create("section", { "classList": "questionBlock", "selectorTitle": "Question", "id": "question" },
            create("div", { "classList": "questionBlock__titleContainer" },
                create("div", { "classList": "container container--close" },
                    create("h2", { "classList": "questionBlock__title" }, text(this.question)))),
            this.questionOptionsBlock
        );
        this.questionBlock.setAttribute("selectorTitle", "Question");
        
        //Create Both TRUE and FALSE answerBlock HTMLElements
        this.defAnswerBlockHeaderTrue = create("h4", { "classList": "checkBlock__Header--true checkBlock__explanation" }, text("True! "));
        this.defAnswerBlockHeaderFalse = create("h4", { "classList": "checkBlock__Header--false checkBlock__explanation" }, text("False! "));
        
        //Create definition Answer Block for when check button is preprocessed
        //  -defAnswerBlock 
        //      -defAnswerBlockHeaderTrue
        //      -defAnswerBlockHeaderFalse
        //      -defAnswerBlockText
        //          -defAnswerBlockHide (with EventListener when clicked for function hide())
        //          -defAnswerBlockLink
        //              -Linktext
        this.defAnswerBlock = create("div", null,
            this.defAnswerBlockHeaderTrue,
            this.defAnswerBlockHeaderFalse,
            create("p", { "classList": "checkBlock__explanation" }, text(this.explanation)),
            createEventObj("click", this.hide.bind(this), false,
                create("input", { "classList": "checkBlock__button", "type": "button", "value": "hide" })),
            createEventObj("click", function x() { window.location.href = link; }, false,
                create("input", { "classList": "checkBlock__button", "type": "button", "value": "Link" })),
        );
        
        /** Entire Assesment page HTML Element */
        const totalAssessment = document.querySelector("#totalAssesment");
        this.setAnswerBlock("none", "none");
        
        totalAssessment === null || totalAssessment === void 0 ? void 0 : totalAssessment.appendChild(this.questionBlock);
    }

    /** Function thats checks the answer and shows the explanation, called for Check Button */
    check() {
        if (this.selectedAnswer) {
            //Replace the undefAnswerBlock with the defAnswerBlock (show the explenation)
            this.checkBlock.replaceChild(this.defAnswerBlock, this.undefAnswerBlock); //gives TypeError
            
            //If the answer is correct, true becomes visable, otherwise, false becomes visable
            this.selectedAnswer == this.answer ? this.setAnswerBlock("block", "none") : this.setAnswerBlock("none", "block");
        }
    }

    /** Function that hides the explanation */
    hide() {
        if (this.checkBlock.children[0] == this.defAnswerBlock) {
            this.checkBlock.replaceChild(this.undefAnswerBlock, this.defAnswerBlock);
        }
    }

    /** Set the display property for True/False HTML Element
     * @param one display type for True Elements
     * @param two display type for False Elements
     */
    setAnswerBlock(one, two) {
        this.defAnswerBlockHeaderTrue.style.display = one;
        this.defAnswerBlockHeaderFalse.style.display = two;
    }
}

/// ../src/script/quiz/Question/multiplechoice

class Multiplechoice extends Question {
    constructor(correctanswer, question, possibleAnswers, explanation, questionnumber, link) {
        super(correctanswer, question, explanation, link);
        
        //Initialize some base values
        this.possibleAnswers = possibleAnswers;
        this.questionNumber = questionnumber;
        this.selectedId = undefined;
    }

    render() {
        /**HTML element containing all the possible question Answers*/
        const questionChoices = create("div", { "classList": "answerBlock" },
            create("div", { "classList": "answerBlock__duo", "id": "D" + this.questionNumber + "first" }),
            create("div", { "classList": "answerBlock__duo", "id": "D" + this.questionNumber + "second" })
        );
        this.questionOptionsBlock.insertBefore(questionChoices, this.checkBlock);
        
        //For loop to create the 4 elements for all the possible answers
        for (let x = 0; x < this.possibleAnswers.length && x < 4; x++) {
            /** Local variable, defines the set it is in */
            let inSet;
            
            //determine if it belongs in the first row, or second row
            if (x < 2) {
                let idDuo = "#D" + this.questionNumber + "first";
                inSet = document.querySelector(idDuo);
            }
            else {
                let idDuo = "#D" + this.questionNumber + "second";
                inSet = document.querySelector(idDuo);
            }
            
            //If it is in either, create the HTML element
            if (inSet) {
                this.buildQuestionChoiceBlock(x, inSet);
            }
        }
    }

    /** creates the HTML element for all question answers */
    buildQuestionChoiceBlock(x, set) {
        /**string, instance of possible answer*/
        const thisAnswer = this.possibleAnswers[x];
        
        /** HTML element for an answer */
        const questionChoiceBlock = createEventObj("click", this.select.bind(this, thisAnswer, x), false,
            create("div", { "classList": "blackBlock blackBlock--small blackBlock--stacking two-col" },
                create("p", { "classList": "answerBlock__Text" }, text(thisAnswer)),
                create("div", { "classList": "answerBlock__checkbox answerBlock__checkbox--deselected", "id": "Q" + this.questionNumber + "checkbox" + x })
            ));
        set.appendChild(questionChoiceBlock);
    }

    /** function called when selected an answer */
    select(inp, id) {
        //Hide the explanation
        this.hide();

        //set the correct variables, and find the old selected HTML-element for the answer
        this.selectedAnswer = inp;
        let idselected = "#Q" + this.questionNumber + "checkbox" + this.selectedId;
        let checkbox = document.querySelector(idselected);
        
        //deselect the old answer(if any)
        if (checkbox) {
            checkbox.classList.remove("answerBlock__checkbox--selected");
            checkbox.classList.add("answerBlock__checkbox--deselected");
        }

        //find the new HTML-element, and set is to selected
        idselected = "#Q" + this.questionNumber + "checkbox" + id;
        checkbox = document.querySelector(idselected);

        if (checkbox) {
            checkbox.classList.remove("answerBlock__checkbox--deselected");
            checkbox.classList.add("answerBlock__checkbox--selected");
        }
        
        //set the ID
        this.selectedId = id;
    }
}

/// ../src/script/quiz/Question/open

class Open extends Question {
    constructor(correctanswer, question, explanation, link) {
        super(correctanswer, question, explanation, link);

        //Create TypeBox as eventHandler that calls changeAnswer when there is an input given
        this.typebox = createEventObj("input", this.changeAnswer.bind(this), false,
            create("input", { "classList": "answerBlock__textInput", "placeholder": "answer" }));
    }

    /** Function Renders the HTMLElements for open questions */
    render() {
        /** HTML Block for the answer*/
        const answerBlock = create("div", { "classList": "answerBlock" },
            create("div", { "classList": "blackBlock blackBlock--label one-col" }, this.typebox)
        );

        this.questionOptionsBlock.insertBefore(answerBlock, this.checkBlock);
    }

    /** Function changes the selected answer to the value of the typebox */
    changeAnswer() {
        this.hide();
        this.selectedAnswer = this.typebox.value;
    }
}

/// ../src/script/quiz/Question/buildQuiz

function buildQuiz() {
    /** base HTML element for the body of the assesment page, id = "totalAssesment" */
    const totalAssessment = create("article", { "id": "totalAssesment", "selectorTitle": "Quiz" });
    totalAssessment.setAttribute("selectorTitle", "Quiz");
    
    /** The body of HTML page*/
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    body?.insertBefore(totalAssessment, footer);

    buildIntro();

    for (let x = 0; x < allQuestions.length && x < 5; x++) {
        /** Local variable that stores the temporary question information */
        const thisQuestion = allQuestions[x];
        let question;
        
        if (thisQuestion.questionType == "multiplechoice") {
            question = new Multiplechoice(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.allAnswers, thisQuestion.explanation, x, thisQuestion.link);
        }
        else {
            question = new Open(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation, thisQuestion.link);
        }
        question.render();
    }
}

function buildIntro() {
    /** section HTML element for the introBlock */
    const assesmentIntro = create("section", { "classList": "intro container", "id": "introduction", "selectorTitle": "Introduction" },
        create("img", { "classList": "intro__img", "src": "src/image/testimage.png" }),
        create("div", { "classList": "intro__text" },
            create("h1", { "classList": "intro__header" }, text("Test Your knowledge!")),
            create("p", { "classList": "intro__paragraph" }, text("on this page you can test your knowledge about pre processors! all information about the topics in this quiz can be found on the website. After u filled in the answer, it will give a short explanation why the answer was right (or wrong) combined with a link to where this information could be found."))
        )
    );

    assesmentIntro.setAttribute("selectorTitle", "Introduction");

    /** main body HTML element of assesment page */
    const totalAssessment = document.querySelector('#totalAssesment');
    totalAssessment?.appendChild(assesmentIntro);
}

/// ../src/script/index

if (document.querySelector('#quiz')) {
    buildQuiz();
}

// Get the menu nodes
let footerMenus = document.querySelectorAll("footer .footer__contributor");
if (footerMenus.length !== 3) {
    console.warn("Unknown page structure, page not loading.");
} else {
    // Clear the footer menu's
    for (const menu of footerMenus) {
        // Clone children property (since the property is modified when deleting a child)
        const children = [...menu.children];
        menu.classList.add("styleModifierElement");

        // Delete children
        for (const node of children) {
            menu.removeChild(node);
        }
    }

    // Menu nodes
    let selectorNode = footerMenus[0];
    let textStyleNode = footerMenus[1];
    let colorStyleNode = footerMenus[2];

    // Initialize the component selector menu
    let nodes = new SelectorBuilder();
    let data = nodes.build(document.body);
    let selector = new SelectorRenderer(data);
    let textStyle = new TextStyleRenderer(selector);
    let colorStyle = new ColorStyleRenderer(selector);
    selector.render(selectorNode);
    textStyle.render(textStyleNode);
    colorStyle.render(colorStyleNode);
}
