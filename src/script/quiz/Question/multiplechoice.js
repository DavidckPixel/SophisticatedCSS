class Multiplechoice extends Question {
    constructor(correctanswer, question, answers, explanation, questionnumber){
        super(correctanswer, question, explanation);
        this.answers = answers;
        this.questionnumber = questionnumber;
        this.selectectedid = undefined;
        var questionChoices = document.createElement('div');
        questionChoices.classList.add("answerBlock");

        var firstDuo = document.createElement('div');
        firstDuo.classList.add("answerBlock__duo");
        var secondDuo = document.createElement('div');
        secondDuo.classList.add("answerBlock__duo");
        

        for (let x=0; x<this.answers.length && x < 4; x++) {
            
            
            let thisAnswer = this.answers[x];
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

            this.checkbox = document.createElement('div');
            this.checkbox.id = "Q" + this.questionnumber + "checkbox" + x;
            this.checkbox.classList.add("answerBlock__checkbox");
            this.checkbox.classList.add("answerBlock__checkbox--deselected")

            
            
            questionChoiceBlock.appendChild(this.checkbox);

            questionChoiceBlock.addEventListener("click", this.select.bind(this, thisAnswer, thisid), false);
            //questionChoiceBlock.addEventListener("click", (function(){this.select(thisAnswer).bind(this)}).bind(this), false);
            if(x<2)
            {
                firstDuo.appendChild(questionChoiceBlock);
            }
            else{
                secondDuo.appendChild(questionChoiceBlock);
            }
            //questionChoices.appendChild(questionChoiceBlock);
            //this.questionBlock.insertBefore(questionChoiceBlock, this.undefAnswerBlock); 

        }
        questionChoices.appendChild(firstDuo);
        questionChoices.appendChild(secondDuo);
        this.questionOptionsBlock.insertBefore(questionChoices, this.checkBlock);
    }
}

Multiplechoice.prototype.select = function(inp, id){
    this.selectedAnswer = inp;

    var idselected ="#Q" + this.questionnumber + "checkbox" + this.selectedid;

    var checkbox = document.querySelector(idselected)

    if (checkbox) {
        checkbox.classList.remove("answerBlock__checkbox--selected");
        checkbox.classList.add("answerBlock__checkbox--deselected");
    }

    idselected = "#Q" + this.questionnumber +"checkbox" + id;

    checkbox = document.querySelector(idselected);
    if(checkbox) {
        checkbox.classList.remove("answerBlock__checkbox--deselected");
        checkbox.classList.add("answerBlock__checkbox--selected");
    }

    this.selectedid = id;
}

