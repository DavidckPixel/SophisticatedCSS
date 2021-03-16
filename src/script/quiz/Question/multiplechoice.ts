/// <reference path="./question.ts" />

class Multiplechoice extends Question {

    possibleAnswers: string[];
    questionNumber: number;
    selectedId?: number;

    constructor(correctanswer: string, question: string, possibleAnswers: string[], explanation: string, questionnumber: number) {
        super(correctanswer, question, explanation);
        this.possibleAnswers = possibleAnswers;
        this.questionNumber = questionnumber;
        this.selectedId = undefined;
        var questionChoices = document.createElement('div');
        questionChoices.classList.add("answerBlock");

        var firstDuo = document.createElement('div');
        firstDuo.classList.add("answerBlock__duo");
        var secondDuo = document.createElement('div');
        secondDuo.classList.add("answerBlock__duo");


        for (let x = 0; x < this.possibleAnswers.length && x < 4; x++) {


            let thisAnswer = this.possibleAnswers[x];
            var thisid = x;

            //var newChoice = new MultipleChoiceChoice(thisAnswer, x, this);
            var questionChoiceBlock = document.createElement('div');
            questionChoiceBlock.classList.add("blackBlock");
            questionChoiceBlock.classList.add("blackBlock--small");
            questionChoiceBlock.classList.add("blackBlock--stacking");
            questionChoiceBlock.classList.add("two-col");
            var questionChoiceBlockText = document.createElement("p");
            questionChoiceBlockText.classList.add("answerBlock__Text")
            var questionChoiceBlockTextFill = document.createTextNode(thisAnswer);
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

        var idselected = "#Q" + this.questionNumber + "checkbox" + this.selectedId;

        var checkbox = document.querySelector(idselected)

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

