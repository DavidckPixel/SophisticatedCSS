/// <reference path="../component/ViewComponent.ts" />

class Quiz extends ViewComponent 
{
    constructor(title : string, id: string, topicid: string){
        super();
        this.setState({
            title: title
        });
    }

    public render(state: any): HTMLElement {
        return this.create("div", {}, state.title);
    }
    
}