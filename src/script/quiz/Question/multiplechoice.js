class Multiplechoice extends Question {
    constructor(correctanswer, question, answers, explanation){
        super(correctanswer, question, explanation);
        this.answers = answers;
        for (let x=0; x<this.answers.length && x < 4; x++) {
            
            
            let thisAnswer = this.answers[x];
            //var newChoice = new MultipleChoiceChoice(thisAnswer, x, this);
            var questionChoiceBlock = document.createElement('section');
            questionChoiceBlock.classList.add("blackBlock");
            questionChoiceBlock.classList.add("blackBlock--small");
            questionChoiceBlock.classList.add("blackBlock--stacking");
            questionChoiceBlock.classList.add("two-col");

            var questionChoiceBlockText = document.createTextNode(thisAnswer);
            questionChoiceBlock.appendChild(questionChoiceBlockText);
            questionChoiceBlock.addEventListener("click", this.select.bind(this, thisAnswer), false);
            //questionChoiceBlock.addEventListener("click", (function(){this.select(thisAnswer).bind(this)}).bind(this), false);
            this.questionBlock.insertBefore(questionChoiceBlock, this.undefAnswerBlock); 

        }
    }
}

Multiplechoice.prototype.select = function(inp){
    this.selectedAnswer = inp; 
    
}


//This class is not used at the moment, because of troubles with not being able to change variable of parentQuestion.
class MultipleChoiceChoice {
    //This class is meant for all the choices in the multiplechoice questions

    constructor(answer, id, parentQuestion){

        //set some base values

        this.id = id;
        this.answer = answer;
        this.parentQuestion = parentQuestion;


        //Creates the element and fills it with the answer text, an eventlistener is added to see when the user clicks on the elements
        //It when sets the parentQuestion selectedAnswer variable to the ID of the choice

        var questionChoiceBlock = document.createElement('div');
        var questionChoiceBlockText = document.createTextNode(this.answer);
        
        questionChoiceBlock.appendChild(questionChoiceBlockText);
        //questionChoiceBlock.innerHTML = "<p>" + answer + "</p>";
        questionChoiceBlock.addEventListener("click", function(){this.selectedAnswer = this.answer;}, false);
        this.parentQuestion.questionBlock.appendChild(questionChoiceBlock); 
    }
}