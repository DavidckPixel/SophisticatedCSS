/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./Quiz.ts" />

class QuizOverview extends ViewComponent {
    constructor(quizes : Quiz[]){
        super();
        this.switchState(quizes);
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
    }

    protected render(state: any): HTMLElement {
        return this.create("div", {}, 
            ...state.quizes.map((x : Quiz) => x.doRender())
        );
    }
}