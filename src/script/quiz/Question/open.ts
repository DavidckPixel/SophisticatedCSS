/// <reference path="./question.ts" />

class Open extends Question {
    constructor(correctanswer: string, question: string, explanation: string) {
        super(correctanswer, question, explanation);

        const answerBlock = document.createElement('div');
        answerBlock.classList.add("answerBlock");

        const questionAnswerSpace = document.createElement('div');
        questionAnswerSpace.classList.add("blackBlock");
        questionAnswerSpace.classList.add("blackBlock--label");
        questionAnswerSpace.classList.add("one-col");

        answerBlock.appendChild(questionAnswerSpace);

        const typebox = document.createElement("input");
        typebox.classList.add("answerBlock__textInput")
        typebox.placeholder = "answer";

        questionAnswerSpace.appendChild(typebox);
        //this.questionBlock.insertBefore(typebox, this.undefAnswerBlock);
        //this.questionBlock.appendChild(typebox);
        this.questionOptionsBlock.insertBefore(answerBlock, this.checkBlock);

    }
}