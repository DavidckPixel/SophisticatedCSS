/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class QuestionOpen extends ViewComponent{
    
    private question : QuestionElement;
    private inputBlock : HTMLInputElement;

    constructor(question : QuestionElement){
        super();

        this.question = question;

        this.inputBlock = this.create("input", { "classList": "answerBlock__textInput", "placeholder": "answer"}) as HTMLInputElement;
        this.inputBlock.addEventListener("input",() =>{
            this.question.setAnswer(this.inputBlock.value);
        })
    }
    
    protected render(state: any): HTMLElement {
        return this.create("div", {},
        this.create("div", { "classList": "blackBlock blackBlock--label one-col" },
            this.inputBlock))
    }
}