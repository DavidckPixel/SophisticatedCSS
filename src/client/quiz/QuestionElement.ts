/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class QuestionElement extends ViewComponent{

    private statement : string;
    private selectedAnswer : string;
    private id :string;

    constructor(id : string, quizid : string, type : string, title : string, statement : string)
    {
        super();

        this.statement = statement;
        this.selectedAnswer = "";
        this.id = id;

        if(type == "multi"){
            console.log("BEN JE HIER GEKOMEN??")
            DynamicloadDoc(`/MutlipleChoice/${this.id}`, (objects : any[]) => {
                console.log(objects);
                const choices = objects.map(choice => new QuestionMulti(choice.id, choice.questionid, choice.statement, choice.choicevalue, this));
                this.setState({input : choices});
                choices.forEach(x => x.mountTo(this));
                console.log("setting states!");
            })
        }
        else if(type == "open"){
            this.setState({input : ""});
        }

        //this.setState({input : []});
    }

    public setAnswer(answer : string){
        this.selectedAnswer = answer;
    }

    protected render(state: any): HTMLElement {
        return this.create("section", { "classList": "questionBlock", "selectorTitle": "Question", "id": "question" },
        this.create("div", { "classList": "questionBlock__titleContainer" },
            this.create("div", { "classList": "container container--close" },
                this.create("h2", { "classList": "questionBlock__title" }, this.statement))),
        this.create("div", { "classList": "container" },
            this.create("div", { "classList": "checkBlock blackBlock" },
                this.create("input", { "classList": "checkBlock__button checkBlock--center", "type": "button", "value": "Check!",
                            onclick : () =>{
                                //check answer
                            } 
                        })
        )),
        ...state.input.map((x : any) => x.doRender())
        );
    }
}