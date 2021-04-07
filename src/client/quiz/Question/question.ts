/// <reference path="../../nodes.ts" />

class Question {
    /** string that holds the correct answer */
    answer: string;
    /** string that holds the question */
    question: string;
    /** string that holds the explenation*/
    explanation: string;
    /** string that holds the selectedAnswer */
    selectedAnswer?: string;

    /** HTMLElement that contains the entire question*/
    questionBlock: HTMLElement;
    /** HTMLElement that contains the block that holds the answer field */
    questionOptionsBlock: HTMLElement;
    /** HTMLElement that contains the explenation/ check block */
    checkBlock: HTMLElement;
    /** HTMLElement block with the check button */
    undefAnswerBlock: HTMLElement;
    /** HTMLElement block with the explenation */
    defAnswerBlock: HTMLElement;
    /** HTMLElement block that contains True */
    defAnswerBlockHeaderTrue: HTMLElement;
    /** HTMLElement block that contains False */
    defAnswerBlockHeaderFalse: HTMLElement;

    constructor(answer: string, question: string, explanation: string, link: string) {

        //INITIALIZE SOME BASE VALUES
        this.answer = answer;
        this.question = question;
        this.explanation = explanation;

        //Create HTMLElement for when answer is still unrevealed, add event listener to it so check() function is called,
        //Element is of type input
        this.undefAnswerBlock = createEventObj("click", this.check.bind(this), false,
            create("input", { "classList": "checkBlock__button checkBlock--center", "type": "button", "value": "Check!" })
        );

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

        totalAssessment?.appendChild(this.questionBlock);
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
    setAnswerBlock(one: string, two: string) {
        this.defAnswerBlockHeaderTrue.style.display = one;
        this.defAnswerBlockHeaderFalse.style.display = two;
    }
}