/// <reference path="../component/ViewComponent.ts" />

class Quiz extends ViewComponent 
{
    public quizMgr? : QuizOverview;
    public id : string;

    constructor(title : string, id: string, topicid: string){
        super();
        this.setState({
            title: title
        });

        this.id = id;
        this.quizMgr = undefined;
    }

    public setQuizMgr(quizMgr : QuizOverview){
        this.quizMgr = quizMgr;
    }

    public render(state: any): HTMLElement {
        return this.create("div", {"classList": "blackBlock blackBlock--label topic", onclick : () => 
            {
                if(this.quizMgr){
                    this.quizMgr.setSelected(this);
                }
            }
        }, this.create("p", {"classList" : "topic__text"}, state.title)
        );
    }
    
}