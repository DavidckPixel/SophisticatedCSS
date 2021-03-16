class Question {

    answer: string;
    question: string;
    explanation: string;
    selectedAnswer?: string;
    questionBlock: HTMLElement;
    questionOptionsBlock: HTMLElement;
    undefAnswerBlock: HTMLElement;
    checkBlock: HTMLElement;
    defAnswerBlock: HTMLElement;
    //defAnswerBlockHeaderTrue: HTMLElement;
    //defAnswerBlockHeaderFalse: HTMLElement;

    constructor(answer: string, question: string, explanation: string, link?: string) {
        //INITIALIZE SOME BASE VALUES

        this.answer = answer;
        this.question = question;
        this.explanation = explanation;
        let selectedAnswer = undefined;

        //Create the element (acticle) that contains all of the parts of the questionBlock
        //Also create the section that holds the title

        this.questionBlock = create("section", {"classList": "questionBlock"},  //Mainblock
            create("div", {"classList": "questionBlock__titleContainer" },  //TITLE BLOCK
                create("div", {"classList": "container container--close"}, //QuestionTextBlock
                    create("h2", {"classList": "questionBlock__title"}, text(this.question)))) //TITLE BLOCK
        );

        /* ---------- Old code no longer neccessary
        this.questionBlock = document.createElement("section"); //IN
        this.questionBlock.classList.add("questionBlock");  //IN

        const questionTitleBlock = document.createElement("div"); //IN
        questionTitleBlock.classList.add("questionBlock__titleContainer"); //IN

        const questionTextBlock = document.createElement("div"); //IN
        questionTextBlock.classList.add("container"); //IN
        questionTextBlock.classList.add("container--close"); //IN

        const questionHeader = document.createElement('h2'); //IN
        questionHeader.classList.add("questionBlock__title") //IN

        const questionText = document.createTextNode(this.question); //IN
        questionHeader.appendChild(questionText);       //IN

        questionTextBlock.appendChild(questionHeader); //IN 
        questionTitleBlock.appendChild(questionTextBlock); //IN

        this.questionBlock.appendChild(questionTitleBlock); //IN
        --------------------*/

        //We create 2 sections and both make them part of the question class, one element the undefAnswerBlock is for
        //when the user has not yet checked his answer, so it only contains a check button, that when clicked checks the answer. and switched
        //the element to the defAnswerBlock

        this.undefAnswerBlock = createEventObj("click", this.check.bind(this), false,
            create("input", {"classList": "checkBlock__button checkBlock--center", "type" : "button", "value": "Check!"},//EXPECT ERROR //CHECKBUTTON
        )) 

        this.checkBlock = create("div", {"classList": "checkBlock blackBlock"});  //undefAnswerBlock
        this.checkBlock.appendChild(this.undefAnswerBlock);

        this.questionOptionsBlock = create("div", {"classList": "container"});  //QUESTION OPTION BLOCK


        this.questionOptionsBlock.appendChild(this.checkBlock);

        /*
        
        this.questionOptionsBlock = document.createElement("div"); //IN
        this.questionOptionsBlock.classList.add("container"); //IN

        this.undefAnswerBlock = document.createElement("div"); //IN

        const checkButton = document.createElement("input"); //IN
        checkButton.setAttribute("type", "button"); //IN
        checkButton.setAttribute("value", "Check!"); //IN
        checkButton.classList.add("checkBlock__button"); //IN
        checkButton.classList.add("checkBlock--center"); //IN

        this.undefAnswerBlock.appendChild(checkButton); //IN


        //The DefAnswerBlock contains all the explenation text, it also contains a link and a hide button which switches this block back to the undefAnswerBlock element;
        this.checkBlock = document.createElement("div") //IN
        this.checkBlock.classList.add("checkBlock"); //IN
        this.checkBlock.classList.add("blackBlock"); //IN

        */

        this.defAnswerBlock = create("div", null, 
            create("p", {"classList" : "checkBlock__explanation"}, text(this.explanation)),  //defAnswerBlockText
            createEventObj("click", this.hide.bind(this), false, 
                create("input", {"type": "button", "value": "hide"})), //defAnswerBlockHide
            create("a", {"href" : link},text("Link")),
            create("h4", null, text("True! ")),
            create("h4", null, text("False! "))
        );

        /*

        this.defAnswerBlock = document.createElement("div");

        const defAnswerBlockText = document.createElement("p"); //IN
        defAnswerBlockText.classList.add("checkBlock__explanation"); //IN
        const defAnswerBlockTextFill = document.createTextNode(this.explanation); //IN
        defAnswerBlockText.appendChild(defAnswerBlockTextFill); //IN

        const defAnswerBlockHide = document.createElement("input"); //IN
        defAnswerBlockHide.setAttribute("type", "button"); //IN
        defAnswerBlockHide.setAttribute("value", "Hide"); //IN
        defAnswerBlockHide.addEventListener("click", this.hide.bind(this), false); //IN

        const defAnswerBlockLink = document.createElement("a");
        if (link)
            defAnswerBlockLink.setAttribute("href", link);
        const defAnswerBlockLinkfill = document.createTextNode("Link");
        //defAnswerBlockLink.innerHTML = "Link";
        defAnswerBlockLink.appendChild(defAnswerBlockLinkfill);
        this.defAnswerBlockHeaderTrue = document.createElement("h4");
        this.defAnswerBlockHeaderFalse = document.createElement("h4");
        const defAnswerBlockHeaderTextTrue = document.createTextNode("True! ");
        const defAnswerBlockHeaderTextFalse = document.createTextNode("False.. ");

        this.defAnswerBlockHeaderTrue.appendChild(defAnswerBlockHeaderTextTrue);
        this.defAnswerBlockHeaderTrue.classList.add("checkBlock__explanation");
        this.defAnswerBlockHeaderFalse.appendChild(defAnswerBlockHeaderTextFalse);
        this.defAnswerBlockHeaderFalse.classList.add("checkBlock__explanation");


        this.defAnswerBlockHeaderTrue.style.display = "none";
        this.defAnswerBlockHeaderFalse.style.display = "none";

        this.defAnswerBlock.appendChild(this.defAnswerBlockHeaderTrue);
        this.defAnswerBlock.appendChild(this.defAnswerBlockHeaderFalse);
        this.defAnswerBlock.appendChild(defAnswerBlockText);
        this.defAnswerBlock.appendChild(defAnswerBlockHide);
        this.defAnswerBlock.appendChild(defAnswerBlockLink);

        */

        //We begin by appending the undefAnswerBlock to the questionBlock first.
        //this.checkBlock.appendChild(this.undefAnswerBlock);
        //this.questionOptionsBlock.appendChild(this.checkBlock);

        this.questionBlock.appendChild(this.questionOptionsBlock);

        //this.questionBlock.appendChild(this.defAnswerBlock);

        //this.defAnswerBlock.style.display ='none';

        const totalAssessment = document.querySelector("#totalAssesment");

        totalAssessment?.appendChild(this.questionBlock);
        //checkButton.addEventListener("click", this.check.bind(this), false);
    }

    check() {
        this.defAnswerBlock.style.display = "block";
        this.checkBlock.replaceChild(this.defAnswerBlock, this.undefAnswerBlock); //gives TypeError

        if (this.selectedAnswer == this.answer) {
            //this.defAnswerBlockHeaderTrue.style.display = "block";
            //this.defAnswerBlockHeaderFalse.style.display = "none";

        }
        else {
            //this.defAnswerBlockHeaderFalse.style.display = "block";
            //this.defAnswerBlockHeaderTrue.style.display = "none";
        }
        //For now this only switches the children
        //The code here should also check if the answer was correct, and if that is the case, add an additional message to the answer stating: correct or incorrect

        //return (this.answer == input);
    }

    hide() {
        this.checkBlock.replaceChild(this.undefAnswerBlock, this.defAnswerBlock);
    }
}