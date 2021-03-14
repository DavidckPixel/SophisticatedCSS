class Multiplechoice extends Question {
    constructor(correctanswer, question, answers){
        super(correctanswer, question);
        this.answers = answers;
        for (var x=0; x<this.answers.length && x < 4; x++) {
            var newChoice = new MultipleChoiceChoice(this.correctanswer, x, this);
        }
    }
}

class MultipleChoiceChoice {
    //This class is meant for all the choices in the multiplechoice questions

    constructor(answer, id, parentQuestion){

        //set some base values

        this.id = id;
        this.answer = answer;
        this.parentQuestion = parentQuestion;

        //Creates the element and fills it with the answer text, an eventlistener is added to see when the user clicks on the elements
        //It when sets the parentQuestion selectedAnswer variable to the ID of the choice

        var questionChoiceBlock = document.createElement('section');
        questionChoiceBlock.innerHTML = "<p>" + answer + "</p>";
        questionChoiceBlock.addEventListener("click", function(){this.parentQuestion.selectedAnswer = id;}, false);
        this.parentQuestion.questionBlock.appendChild(questionChoiceBlock); 
    }
}