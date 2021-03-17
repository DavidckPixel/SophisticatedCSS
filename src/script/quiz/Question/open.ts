/// <reference path="./question.ts" />

class Open extends Question {
    typebox: HTMLInputElement;
    constructor(correctanswer: string, question: string, explanation: string) {
        super(correctanswer, question, explanation);
        this.typebox = document.createElement("input");
        this.render();
        
    }

    render() {
        const answerBlock = document.createElement('div');
        answerBlock.classList.add("answerBlock");

        const questionAnswerSpace = document.createElement('div');
        questionAnswerSpace.classList.add("blackBlock");
        questionAnswerSpace.classList.add("blackBlock--label");
        questionAnswerSpace.classList.add("one-col");

        answerBlock.appendChild(questionAnswerSpace);

        
        this.typebox.classList.add("answerBlock__textInput")
        this.typebox.placeholder = "answer";
        this.typebox.addEventListener('input', this.changeAnswer.bind(this))

        questionAnswerSpace.appendChild(this.typebox);
        //this.questionBlock.insertBefore(typebox, this.undefAnswerBlock);
        //this.questionBlock.appendChild(typebox);
        this.questionOptionsBlock.insertBefore(answerBlock, this.checkBlock);

    }

    changeAnswer(){        
        this.selectedAnswer = this.typebox.value;
    }
}