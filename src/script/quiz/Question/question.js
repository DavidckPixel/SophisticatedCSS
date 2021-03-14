class Question {
    constructor(answer, question, explenation, link){

        //INITIALIZE SOME BASE VALUES

        this.answer = answer;
        this.question = question;
        this.explenation = explenation;
        this.selectedAnswer = undefined;

        //Create the element (acticle) that contains all of the parts of the questionBlock
        //Also create the section that holds the title
        
        this.questionBlock = document.createElement("article");
        var questionTextBlock = document.createElement("section");
        questionTextBlock.innerHTML = "<h2>" + this.question + "</h2>";
        this.questionBlock.appendChild(questionTextBlock);

        //We create 2 sections and both make them part of the question class, one element the undefAnswerBlock is for
        //when the user has not yet checked his answer, so it only contains a check button, that when clicked checks the answer. and switched
        //the element to the defAnswerBlock

        this.undefAnswerBlock = document.createElement("section");
        this.undefAnswerBlock.className = "answer";
        var checkButton = document.createElement("input");
        checkButton.setAttribute("type", "button");
        checkButton.setAttribute("value", "Check!");
        checkButton.setAttribute("onclick", check(this.selectedAnswer));
        this.undefAnswerBlock.appendChild(checkButton);

        //The DefAnswerBlock contains all the explenation text, it also contains a link and a hide button which switches this block back to the undefAnswerBlock element;

        this.defAnswerBlock = document.createElement("section");
        this.defAnswerBlock.classNAme = "answer";
        var defAnswerBlockText = document.createElement("p");
        defAnswerBlockText.innerHTML = this.explenation;
        var defAnswerBlockHide = document.createElement("input");
        defAnswerBlockHide.setAttribute("type", "button");
        defAnswerBlockHide.setAttribute("value", "Hide");
        defAnswerBlockHide.setAttribute("onclick", function(){this.questionBlock.replaceChild(this.undefAnswerBlock, this.defAnswerBlock);});
        var defAnswerBlockLink = document.createElement("a");
        defAnswerBlockLink.setAttribute("href", link);
        defAnswerBlockLink.innerHTML = "Link";
        this.defAnswerBlock.appendChild(defAnswerBlockText);
        this.defAnswerBlock.appendChild(defAnswerBlockHide);
        this.defAnseerBlock.appendChild(defAnswerBlockLink);

        //We begin by appending the undefAnswerBlock to the questionBlock first.

        this.questionBlock.appendChild(undefAnswerBlock);
    }
}

Question.prototype.check = function(input){

    this.questionBlock.replaceChild(this.defAnswerBlock, this.undefAnswerBlock);

    //For now this only switches the children
    //The code here should also check if the answer was correct, and if that is the case, add an additional message to the answer stating: correct or incorrect

    //return (this.answer == input);
};