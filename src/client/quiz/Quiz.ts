/// <reference path="../component/ViewComponent.ts" />

class Quiz extends ViewComponent 
{
    public quizMgr? : QuizOverview;
    public id : string;
    private thisquizoverview? : QuizOverview;

    private topicid : string;

    constructor(title : string, id: string, topicid: string){
        super();
        this.setState({
            title: title
        });

        this.id = id;
        this.quizMgr = undefined;
        this.topicid = topicid;
    }




    public setQuizMgr(quizMgr? : QuizOverview){
        this.quizMgr = quizMgr;
    }

    public render(state: any): HTMLElement {
        

        
        return this.create("div", {"classList": "blackBlock blackBlock--label oneQuiz", "id" : this.id, onclick : () => 
            {
                if(this.quizMgr){                    
                    this.quizMgr.setSelected(this);
                }
                
            }
        }, this.create("p", {"classList" : "oneQuiz__text"}, state.title),
        this.create("input", {"type":"button", "value" : "Start!","classList" : "oneQuiz__startButton", onclick: () => 
                {
                    if(this.quizMgr){                    
                        this.quizMgr.setSelected(this);
                    }
                    if(this.quizMgr && this.quizMgr.selected){
                        this.quizMgr.pageMgr.selectedQuiz(this.quizMgr.selected.id);
                    }
                }
            }));
    }

    


    
}