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
        this.setState({selectclass: "answerBlock__checkbox--deselected"})
    }
    
    protected render(state: any): HTMLElement {
        return this.create("div", {},
            this.create("div", { "classList": "blackBlock blackBlock--small two-col", onclick : () =>{
                this.question.setAnswer(this.value, this);
            }
            },
                this.create("p", { "classList": "answerBlock__Text" }, this.statement),
                    this.create("div", { "classList": `answerBlock__checkbox ${state.selectclass}`})
            )
        );
    }
}
