/// <reference path="../component/ViewComponent.ts" />

class Quiz extends ViewComponent 
{
    private title :string;

    constructor(title : string, id: string, topicid: string){
        super();

        this.title = title;

        this.setState("");
    }

    public render(state: any): HTMLElement {
        return this.create("div",{}, this.title);
    }
    
}

class AllQuizes extends ViewComponent{
    constructor(objects : {title: string, id: string, topicid : string}[]){
        super();
        const body = document.querySelector("body");

        if(!body){
            console.log("Body was not found");
            return;
        }

        this.switchState(objects);
        this.mountTo(body);
    }

    public switchState(objects : {title: string, id: string, topicid : string}[]){
        console.log("switching states!");
        this.setState({quizes: objects.map(quiz => {
            let obj = new Quiz(quiz.title, quiz.id, quiz.topicid);
            obj.mountTo(this);
            return obj
        })});
    }

    protected render(state: any): HTMLElement {
        console.log(state.quizes);
        return this.create("div", {}, 
        ...state.quizes.map((x : Quiz) => x.doRender())
    )
    }
}