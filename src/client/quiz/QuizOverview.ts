/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./Quiz.ts" />

class QuizOverview extends ViewComponent {

    public selected? : Quiz;
    public pageMgr : QuizPageController;

    constructor(quizes : Quiz[], pageMgr : QuizPageController){
        super();

        this.pageMgr = pageMgr;
        this.switchState(quizes);
    }

    public setSelected(selected? : Quiz){
        this.selected = selected;

        if(selected){
            console.log("Selected Quiz " + selected.id);
        }
    }

    public switchState(quizes : Quiz[]){
        for (const quiz of this.state?.quizes || []) {
            quiz.unmount();
        } 
        
        for (const quiz of quizes) {
            quiz.mountTo(this);
        }

        this.setState({
            quizes: quizes,
        });

        this.selected = undefined;
    }

    protected render(state: any): HTMLElement {
        return this.create("div", {}, 
            this.create("div", {"classList" : "quiz__controlblock"}, 
                this.create("input", {"type":"button", "value" : "Start!", onclick: () => 
                {
                    if(this.selected){
                        this.pageMgr.selectedQuiz(this.selected.id);
                    }
                }
            }),
                this.create("input", {"type":"button", "value" : "Idk!"})
            ),
            this.create("div", {"classList" : "quiz__quizblock"},
            ...state.quizes.map((x : Quiz) => x.doRender()))
        );
    }
}