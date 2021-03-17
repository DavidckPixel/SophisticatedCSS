/// <reference path="./question.ts" />

class Multiplechoice extends Question {
    /**  Array of strings for all possible answers to the question*/
    possibleAnswers: string[];
    /** Question Identifier, is unique to each question */
    questionNumber: number;
    /** Question Identifier of the currently selected answer */
    selectedId?: number;

    constructor(correctanswer: string, question: string, possibleAnswers: string[], explanation: string, questionnumber: number, link : string) {
        super(correctanswer, question, explanation, link);

        //Initialize some base values
        this.possibleAnswers = possibleAnswers;
        this.questionNumber = questionnumber;
        this.selectedId = undefined;

        //render the page
        this.render();
    }

    render() {
        
        /**HTML element containing all the possible question Answers*/
        const questionChoices = create("div", {"classList": "answerBlock"},
            create("div", {"classList": "answerBlock__duo", "id": "D" + this.questionNumber + "first"}),
            create("div", {"classList": "answerBlock__duo", "id": "D" + this.questionNumber + "second"})
        )
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
            if(inSet)
            {                
                this.buildQuestionChoiceBlock(x, inSet)
            }            
        }               
    }
    
    /** creates the HTML element for all question answers */
    buildQuestionChoiceBlock(x: number, set: Element){

        /**string, instance of possible answer*/
        const thisAnswer = this.possibleAnswers[x];

        /** HTML element for an answer */
        const questionChoiceBlock = createEventObj("click", this.select.bind(this, thisAnswer, x), false,
            create("div", {"classList": "blackBlock blackBlock--small blackBlock--stacking two-col"},
                create("p", {"classList": "answerBlock__Text"}, text(thisAnswer)),
            create("div", {"classList": "answerBlock__checkbox answerBlock__checkbox--deselected", "id":"Q" + this.questionNumber + "checkbox" + x})        
        ))
        set.appendChild(questionChoiceBlock);
    }

    /** function called when selected an answer */
    select(inp: string, id: number) {

        //Hide the explanation
        this.hide();

        //set the correct variables, and find the old selected HTML-element for the answer
        this.selectedAnswer = inp;
        let idselected = "#Q" + this.questionNumber + "checkbox" + this.selectedId;
        let checkbox = document.querySelector(idselected)

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

