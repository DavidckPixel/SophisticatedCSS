/// <reference path="./question.ts" />

class Multiplechoice extends Question {

    possibleAnswers: string[];
    questionNumber: number;
    selectedId?: number;

    constructor(correctanswer: string, question: string, possibleAnswers: string[], explanation: string, questionnumber: number, link : string) {
        super(correctanswer, question, explanation, link);
        this.possibleAnswers = possibleAnswers;
        this.questionNumber = questionnumber;
        this.selectedId = undefined;
        this.render();
    }

    render() {
        const questionChoices = document.createElement('div');
        questionChoices.classList.add("answerBlock");

        const firstDuo = document.createElement('div');
        firstDuo.classList.add("answerBlock__duo");
        const secondDuo = document.createElement('div');
        secondDuo.classList.add("answerBlock__duo");


        for (let x = 0; x < this.possibleAnswers.length && x < 4; x++) {

            const thisAnswer = this.possibleAnswers[x];
            const thisid = x;

            //const newChoice = new MultipleChoiceChoice(thisAnswer, x, this);
            const questionChoiceBlock = document.createElement('div');
            questionChoiceBlock.classList.add("blackBlock");
            questionChoiceBlock.classList.add("blackBlock--small");
            questionChoiceBlock.classList.add("blackBlock--stacking");
            questionChoiceBlock.classList.add("two-col");
            const questionChoiceBlockText = document.createElement("p");
            questionChoiceBlockText.classList.add("answerBlock__Text")
            const questionChoiceBlockTextFill = document.createTextNode(thisAnswer);
            questionChoiceBlockText.appendChild(questionChoiceBlockTextFill);

            questionChoiceBlock.appendChild(questionChoiceBlockText);

            const checkbox = document.createElement('div');
            checkbox.id = "Q" + this.questionNumber + "checkbox" + x;
            checkbox.classList.add("answerBlock__checkbox");
            checkbox.classList.add("answerBlock__checkbox--deselected")

            questionChoiceBlock.appendChild(checkbox);

            questionChoiceBlock.addEventListener("click", this.select.bind(this, thisAnswer, thisid), false);
            //questionChoiceBlock.addEventListener("click", (function(){this.select(thisAnswer).bind(this)}).bind(this), false);
            if (x < 2) {
                firstDuo.appendChild(questionChoiceBlock);
            }
            else {
                secondDuo.appendChild(questionChoiceBlock);
            }
            //questionChoices.appendChild(questionChoiceBlock);
            //this.questionBlock.insertBefore(questionChoiceBlock, this.undefAnswerBlock); 

        }
        questionChoices.appendChild(firstDuo);
        questionChoices.appendChild(secondDuo);
        this.questionOptionsBlock.insertBefore(questionChoices, this.checkBlock);
    }

    select(inp: string, id: number) {
        this.selectedAnswer = inp;

        let idselected = "#Q" + this.questionNumber + "checkbox" + this.selectedId;

        let checkbox = document.querySelector(idselected)

        if (checkbox) {
            checkbox.classList.remove("answerBlock__checkbox--selected");
            checkbox.classList.add("answerBlock__checkbox--deselected");
        }

        idselected = "#Q" + this.questionNumber + "checkbox" + id;

        checkbox = document.querySelector(idselected);
        if (checkbox) {
            checkbox.classList.remove("answerBlock__checkbox--deselected");
            checkbox.classList.add("answerBlock__checkbox--selected");
        }

        this.selectedId = id;
    }
}

