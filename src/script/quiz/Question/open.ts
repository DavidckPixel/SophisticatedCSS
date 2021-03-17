/// <reference path="./question.ts" />

class Open extends Question {
    /** HTML element for typing the answer */
    typebox: HTMLInputElement;

    constructor(correctanswer: string, question: string, explanation: string, link : string) {
        super(correctanswer, question, explanation, link);

        //Create TypeBox as eventHandler that calls changeAnswer when there is an input given
        this.typebox = (createEventObj("input", this.changeAnswer.bind(this), false, 
        create("input", {"classList": "answerBlock__textInput", "placeholder" : "answer"})) as HTMLInputElement);

        //Call Render function
        this.render();      
    }

    /** Function Renders the HTMLElements for open questions */
    render() {

        /** HTML Block for the answer*/
        const answerBlock = (create("div", {"classList" : "answerBlock"}, 
            create("div", {"classList": "blackBlock blackBlock--label one-col"}, this.typebox)
            ) as HTMLElement);
        
        this.questionOptionsBlock.insertBefore(answerBlock, this.checkBlock);
    }

    /** Function changes the selected answer to the value of the typebox */
    changeAnswer(){   
        this.hide();     
        this.selectedAnswer = this.typebox.value;
    }
}