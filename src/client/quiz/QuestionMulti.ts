/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class QuestionMulti extends ViewComponent{
    
    private statement : string;
    private question : QuestionElement;
    private value : string;

    constructor(id : string, questionid : string, statement : string, choicevalue : string, question : QuestionElement){
        super();

        this.statement = statement;
        this.question = question;
        this.value = choicevalue;
    }
    
    protected render(state: any): HTMLElement {
        return this.create("div", { "classList": "blackBlock blackBlock--small blackBlock--stacking two-col", onclick : () =>{
            this.question.setAnswer(this.value);
        }
        },
            this.create("p", { "classList": "answerBlock__Text" }, this.statement),
                this.create("div", { "classList": "answerBlock__checkbox answerBlock__checkbox--deselected"})
        );
    }

}
