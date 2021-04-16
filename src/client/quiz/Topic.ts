/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class Topic extends ViewComponent 
{
    quizMgr: QuizOverview;
    private thistopicoverview? : TopicOverview;
    private selected : boolean;

    constructor(name : string, id : string, quizes: QuizOverview, thistopicoverview?: TopicOverview){
        super();
        this.setState({
            name: name,
            id: id,
            selectclass: "answerBlock__checkbox--deselected",
            
        });

        this.quizMgr = quizes;
        this.selected = false;
        
    }

    public giveOverview(thistopicoverview : TopicOverview){
        this.thistopicoverview = thistopicoverview;
    }

    public setSelected(){
        this.selected = true;
    }

    public setUnSelected(){
        this.selected = false;
    }

    public render(state: any): HTMLElement {
        
        let selectionstyle = "topic__checkbox--deselected"
        if(this.selected){
            selectionstyle = "topic__checkbox--selected"
        }
        return this.create("div", { "classList": "blackBlock blackBlock--label topic",
            onclick: () => {
                if(this.thistopicoverview)
                {
                    this.thistopicoverview.setTopic(this);
                }
                
                DynamicloadDoc(`/assesment/topics/${state.id}`, (objects : any[]) => {
                    const quizes = objects.map(quiz => new Quiz(quiz.title, quiz.id, state.id));
                    quizes.forEach(x => x.setQuizMgr(this.quizMgr));
                    this.quizMgr.switchState(quizes);
                });
            }
        },
            this.create("p", {"classList" : "topic__text"}, state.name),
            this.create("div", { "classList": `topic__checkbox ${selectionstyle}`})
        );
    }

    
}
