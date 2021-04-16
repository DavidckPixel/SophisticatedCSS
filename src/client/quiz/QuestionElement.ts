/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class QuestionElement extends ViewComponent{

    private statement : string;
    private selectedAnswer : string;
    private id :string;
    private quizMgr : QuizPageController;
    private type : string;

    constructor(id : string, quizid : string, type : string, title : string, statement : string, quizMgr : QuizPageController)
    {
        super();

        this.statement = statement;
        this.selectedAnswer = "";
        this.id = id;
        this.quizMgr = quizMgr;
        this.type = type;

        if(type == "multi"){
            DynamicloadDoc(`/MutlipleChoice/${this.id}`, (objects : any[]) => {
                const choices = objects.map(choice => new QuestionMulti(choice.id, choice.questionid, choice.statement, choice.choiceValue, this));
                this.setState({input : choices});
                choices.forEach(x => x.mountTo(this));
            })
        }
        else if(type == "open"){
            DynamicloadDoc(`/MutlipleChoice/${this.id}`, (objects : any[]) => { //Doe er niks mee maar moet??
                const opens : QuestionOpen[] = [];
                opens.push(new QuestionOpen(this));
                this.setState({input : opens});
                opens.forEach(x => x.mountTo(this));
            })
        }

        //this.setState({input : []});
    }

    public setAnswer(answer : string, obj? : QuestionMulti){
        this.selectedAnswer = answer;

        if(this.type == "multi" && obj){
            this.executeStateFunction((obj : QuestionMulti) => {
                obj.setState({selectclass:  "answerBlock__checkbox--deselected"});
            }) 
            obj.setState({selectclass:  "answerBlock__checkbox--selected"})
        }
    }

    public checkAnswer(){
        console.log("sending asnwer: " + this.selectedAnswer)
        PostDynamicloadDoc(`/assesment/${this.id}`,this.selectedAnswer, (Objs : any) =>{
            console.log(Objs.answer);
            if(Objs.answer){
                console.log("you answered correctly");
            }
            else{ 
                console.log("you answered incorrectly!");
            }
        })
    }

    protected render(state: any): HTMLElement {

        if(!state){return this.create("div");}

        return this.create("section", { "classList": "questionBlock", "selectorTitle": "Question", "id": "question" },
        this.create("div", { "classList": "questionBlock__titleContainer" },
            this.create("div", { "classList": "container container--close" },
                this.create("h2", { "classList": "questionBlock__title" }, this.statement))),
        this.create("div", { "classList": "container" },
            this.create("div", {"classList": "answerBlock"},
            ...state.input.map((x : any) => x.doRender())), 
            this.create("div", {"classList": "checkBlock"},
                this.create("div", { "classList": "blackBlock" },
                    this.create("input", { "classList": "checkBlock__button checkBlock--center", "type": "button", "value": "Check!",
                                onclick : () =>{
                                    this.checkAnswer();
                                } 
                        })),
                this.create("input", { "classList": "checkBlock__button two-col", "type": "button", "value": "Back",
                    onclick : () =>{
                        this.quizMgr.previousQuestion();
                    } 
                }),
                this.create("input", { "classList": "checkBlock__button two-col", "type": "button", "value": "Next",
                    onclick : () =>{
                        this.quizMgr.nextQuestion();
                    } 
                })
        ),
    ));
    }
}