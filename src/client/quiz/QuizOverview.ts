/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./Quiz.ts" />

class QuizOverview extends ViewComponent {

    public selected? : Quiz;
    public pageMgr : QuizPageController;
    public allquizes : Quiz[];

    constructor(quizes : Quiz[], pageMgr : QuizPageController){
        super();

        this.pageMgr = pageMgr;
        this.switchState(quizes);
        this.allquizes = quizes;
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
        return this.create("section", {"classList":"quiz two-col"}, 
            this.create("h2", {"classList" : "quiz__title"}, "Quizes"),
            this.create("div", {"classList" : "quiz__controlblock blackBlock blackBlock--label"},
                this.create("input", {"type":"button", "value" : "Topic info", "classList" : "quiz__controlbutton", onclick: () => {
                    if(this.pageMgr.topicinfo != ""){
                        window.location.replace(this.pageMgr.topicinfo);
                    }
                }})
            ),
            this.create("div", {"classList" : "quiz__quizblock"},
            ...state.quizes.map((x : Quiz) => x.doRender()))
        );
    }


}