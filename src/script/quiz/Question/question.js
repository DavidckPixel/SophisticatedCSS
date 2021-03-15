class Question {
    
    
    constructor(answer, question, explanation, link){

        //INITIALIZE SOME BASE VALUES

        this.answer = answer;
        this.question = question;
        this.explanation = explanation;
        this.selectedAnswer = 4;

        //Create the element (acticle) that contains all of the parts of the questionBlock
        //Also create the section that holds the title
        
        this.questionBlock = document.createElement("article");
        var questionTextBlock = document.createElement("section");
        var questionHeader = document.createElement('h2');
        var questionText = document.createTextNode(this.question);
        questionHeader.appendChild(questionText);
        questionTextBlock.appendChild(questionHeader);
        this.questionBlock.appendChild(questionTextBlock);

        //We create 2 sections and both make them part of the question class, one element the undefAnswerBlock is for
        //when the user has not yet checked his answer, so it only contains a check button, that when clicked checks the answer. and switched
        //the element to the defAnswerBlock

        this.undefAnswerBlock = document.createElement("section");
        this.undefAnswerBlock.className = "answer";
        var checkButton = document.createElement("input");
        checkButton.setAttribute("type", "button");
        checkButton.setAttribute("value", "Check!");
        
        this.undefAnswerBlock.appendChild(checkButton);

        //The DefAnswerBlock contains all the explenation text, it also contains a link and a hide button which switches this block back to the undefAnswerBlock element;

        this.defAnswerBlock = document.createElement("section");
        this.defAnswerBlock.className = "answer";
        var defAnswerBlockText = document.createElement("p");
        var defAnswerBlockTextFill = document.createTextNode(this.explanation);
        defAnswerBlockText.appendChild(defAnswerBlockTextFill);
        //defAnswerBlockText.innerHTML = this.explenation;

        var defAnswerBlockHide = document.createElement("input");
        defAnswerBlockHide.setAttribute("type", "button");
        defAnswerBlockHide.setAttribute("value", "Hide");
        defAnswerBlockHide.addEventListener("click", this.hide.bind(this), false);
        
        var defAnswerBlockLink = document.createElement("a");
        defAnswerBlockLink.setAttribute("href", link);
        var defAnswerBlockLinkfill = document.createTextNode("Link");
        //defAnswerBlockLink.innerHTML = "Link";
        defAnswerBlockLink.appendChild(defAnswerBlockLinkfill);
        var defAnswerBlockHeaderTrue = document.createElement("h4");
        var defAnswerBlockHeaderFalse = document.createElement("h4");
        var defAnswerBlockHeaderTextTrue = document.createTextNode("True! ");
        var defAnswerBlockHeaderTextFalse = document.createTextNode("False.. ");
        
        defAnswerBlockHeaderTrue.appendChild(defAnswerBlockHeaderTextTrue);
        defAnswerBlockHeaderFalse.appendChild(defAnswerBlockHeaderTextFalse);

        defAnswerBlockHeaderTrue.style.display = "none";
        defAnswerBlockHeaderFalse.style.display = "none";

        this.defAnswerBlock.appendChild(defAnswerBlockHeaderTrue);
        this.defAnswerBlock.appendChild(defAnswerBlockHeaderFalse);
        this.defAnswerBlock.appendChild(defAnswerBlockText);
        this.defAnswerBlock.appendChild(defAnswerBlockHide);
        this.defAnswerBlock.appendChild(defAnswerBlockLink);

        //We begin by appending the undefAnswerBlock to the questionBlock first.

        this.questionBlock.appendChild(this.undefAnswerBlock);
        //this.questionBlock.appendChild(this.defAnswerBlock);

        //this.defAnswerBlock.style.display ='none';

        var body = document.querySelector("body");
        
        body.appendChild(this.questionBlock);
        checkButton.addEventListener("click", this.check.bind(this), false);

    }
}


Question.prototype.check = function(){
    this.defAnswerBlock.style.display = "block";    
    this.questionBlock.replaceChild(this.defAnswerBlock, this.undefAnswerBlock); //gives TypeError

    //For now this only switches the children
    //The code here should also check if the answer was correct, and if that is the case, add an additional message to the answer stating: correct or incorrect

    //return (this.answer == input);
};

Question.prototype.hide = function(){    
    this.questionBlock.replaceChild(this.undefAnswerBlock, this.defAnswerBlock);
}