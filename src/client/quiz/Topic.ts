/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class Topic extends ViewComponent 
{
    quizMgr: QuizOverview;

    constructor(name : string, id : string, quizes: QuizOverview){
        super();
        this.setState({
            name: name,
            id: id,
        });

        this.quizMgr = quizes;
    }

    public render(state: any): HTMLElement {
        return this.create("div", {
            onclick: () => {
                DynamicloadDoc(`/assesment/topics/${state.id}`, (objects : any[]) => {
                    const quizes = objects.map(quiz => new Quiz(quiz.title, quiz.id, quiz.topicid));
                    quizes.forEach(x => x.setQuizMgr(this.quizMgr));
                    this.quizMgr.switchState(quizes);
                });
            }
        },
            this.create("p", {}, state.name)
        );
    }
}
