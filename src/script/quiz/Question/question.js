class Question {
    
    
    constructor(answer, question, explanation, link){

        //INITIALIZE SOME BASE VALUES

        this.answer = answer;
        this.question = question;
        this.explanation = explanation;
        let selectedAnswer = undefined;

        //Create the element (acticle) that contains all of the parts of the questionBlock
        //Also create the section that holds the title
        
        this.questionBlock = document.createElement("section");
        this.questionBlock.classList.add("questionBlock");

        var questionTitleBlock = document.createElement("div");
        questionTitleBlock.classList.add("questionBlock__titleContainer");

        var questionTextBlock = document.createElement("div");
        questionTextBlock.classList.add("container");

        var questionHeader = document.createElement('h2');
        questionHeader.classList.add("questionBlock__title")
        
        var questionText = document.createTextNode(this.question);
        questionHeader.appendChild(questionText);

        questionTextBlock.appendChild(questionHeader);
        questionTitleBlock.appendChild(questionTextBlock);

        this.questionBlock.appendChild(questionTitleBlock);

        //We create 2 sections and both make them part of the question class, one element the undefAnswerBlock is for
        //when the user has not yet checked his answer, so it only contains a check button, that when clicked checks the answer. and switched
        //the element to the defAnswerBlock
        this.questionOptionsBlock = document.createElement("div");
        this.questionOptionsBlock.classList.add("container");
        this.undefAnswerBlock = document.createElement("div");
        
        this.undefAnswerBlock.className = "answer";
        var checkButton = document.createElement("input");
        checkButton.setAttribute("type", "button");
        checkButton.setAttribute("value", "Check!");
        
        this.undefAnswerBlock.appendChild(checkButton);
        

        //The DefAnswerBlock contains all the explenation text, it also contains a link and a hide button which switches this block back to the undefAnswerBlock element;
        this.checkBlock = document.createElement("div")
        this.checkBlock.classList.add("checkBlock");
        this.checkBlock.classList.add("blackBlock");

        this.defAnswerBlock = document.createElement("div");
        
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
        this.defAnswerBlockHeaderTrue = document.createElement("h4");
        this.defAnswerBlockHeaderFalse = document.createElement("h4");
        var defAnswerBlockHeaderTextTrue = document.createTextNode("True! ");
        var defAnswerBlockHeaderTextFalse = document.createTextNode("False.. ");
        
        this.defAnswerBlockHeaderTrue.appendChild(defAnswerBlockHeaderTextTrue);
        this.defAnswerBlockHeaderFalse.appendChild(defAnswerBlockHeaderTextFalse);

        this.defAnswerBlockHeaderTrue.style.display = "none";
        this.defAnswerBlockHeaderFalse.style.display = "none";

        this.defAnswerBlock.appendChild(this.defAnswerBlockHeaderTrue);
        this.defAnswerBlock.appendChild(this.defAnswerBlockHeaderFalse);
        this.defAnswerBlock.appendChild(defAnswerBlockText);
        this.defAnswerBlock.appendChild(defAnswerBlockHide);
        this.defAnswerBlock.appendChild(defAnswerBlockLink);

        //We begin by appending the undefAnswerBlock to the questionBlock first.
        this.checkBlock.appendChild(this.undefAnswerBlock);
        this.questionOptionsBlock.appendChild(this.checkBlock);
        this.questionBlock.appendChild(this.questionOptionsBlock);
        //this.questionBlock.appendChild(this.defAnswerBlock);

        //this.defAnswerBlock.style.display ='none';

        var totalAssessment = document.querySelector("#totalAssesment");
        
        totalAssessment.appendChild(this.questionBlock);
        checkButton.addEventListener("click", this.check.bind(this), false);

    }
}


Question.prototype.check = function(){
    this.defAnswerBlock.style.display = "block";    
    this.questionBlock.replaceChild(this.defAnswerBlock, this.undefAnswerBlock); //gives TypeError

    if(this.selectedAnswer == this.answer)
    {
        // console.log("right answer");
        this.defAnswerBlockHeaderTrue.style.display = "block";
        
    }
    else{
        // console.log(this.answer);
        // console.log(this.selectedAnswer);
        // console.log("wrong answer!")
        this.defAnswerBlockHeaderFalse.style.display = "block";
    }
    //For now this only switches the children
    //The code here should also check if the answer was correct, and if that is the case, add an additional message to the answer stating: correct or incorrect

    //return (this.answer == input);
};

Question.prototype.hide = function(){    
    this.questionBlock.replaceChild(this.undefAnswerBlock, this.defAnswerBlock);
    this.defAnswerBlockHeaderTrue.style.display = "none";
    this.defAnswerBlockHeaderFalse.style.display = "none";
}