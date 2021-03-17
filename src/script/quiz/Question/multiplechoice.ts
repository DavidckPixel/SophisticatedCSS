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
        this.render();
    }

    render() {
        
        const questionChoices = create("div", {"classList": "answerBlock"},
            create("div", {"classList": "answerBlock__duo", "id": "D" + this.questionNumber + "first"}),
            create("div", {"classList": "answerBlock__duo", "id": "D" + this.questionNumber + "second"})
        )
        this.questionOptionsBlock.insertBefore(questionChoices, this.checkBlock);

        for (let x = 0; x < this.possibleAnswers.length && x < 4; x++) {
            let inSet;
            if (x < 2) {
                let idDuo = "#D" + this.questionNumber + "first";
                inSet = document.querySelector(idDuo);
            }
            else {
                let idDuo = "#D" + this.questionNumber + "second";
                inSet = document.querySelector(idDuo);
            }            
            if(inSet)
            {                
                this.buildQuestionChoiceBlock(x, inSet)
            }            
        }               
    }
    
    buildQuestionChoiceBlock(x: number, set: Element){
        const thisAnswer = this.possibleAnswers[x];
        const questionChoiceBlock = create("div", {"classList": "blackBlock blackBlock--small blackBlock--stacking two-col"},
            create("p", {"classList": "answerBlock__Text"}, text(thisAnswer)),
            create("div", {"classList": "answerBlock__checkbox answerBlock__checkbox--deselected", "id":"Q" + this.questionNumber + "checkbox" + x})        
        )
        createEventObj("click",this.select.bind(this, thisAnswer, x), false, questionChoiceBlock);
        set.appendChild(questionChoiceBlock);
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

