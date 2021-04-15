/// <reference path="../component/ViewComponent.ts" />
/// <reference path="./QuizOverview.ts" />

class QuizBody extends ViewComponent{

    protected render(state: any): HTMLElement {
        if(!this.allmounted){
            return this.create("div", {"classList" : "quiz__bodyElement"}, "Text");
        }

        return this.create("div", {"classList" : "quiz__bodyElement"}, 
        ...this.allmounted.map(x => x.doRender()))
    }

}