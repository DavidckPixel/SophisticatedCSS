/// <reference path="../component/ViewComponent.ts" />

class Topic extends ViewComponent 
{
    public id : string;
    public title : string;

    constructor(name : string, id : string, appendto? : HTMLElement){
        super();

        this.id = id;
        this.title = name;

        console.log("settingState!" + this.title);

        this.setState({name: this.title})
    }

    public render(state: any): HTMLElement {

        console.log("HTML ELEMENT CREATED");

        let temp = this.create("div", {onclick: () => 
            {
                DynamicloadDoc(`/assesment/topics/${this.id}`, (objects : any[]) => {
                    console.log(objects);
                    allquizes.switchState(objects);
                });
            }//ajax zooi
        },
            this.create("p", {}, this.title)
        );
        return temp;
    }
}

class AllTopics extends ViewComponent{
    constructor(objects : {title: string, id: string, description : string}[]){
        super();

        const body = document.querySelector("body");
        if(!body){
            console.log("Body was not found");
            return;
        }

        this.setState({topics: objects.map(topic => {
            let obj = new Topic(topic.title, topic.id);
            obj.mountTo(this);
            return obj
        })});

        this.mountTo(body);
    }

    public render(state: any): HTMLElement {
        return this.create("div", {}, 
            ...state.topics.map((x : Topic) => x.doRender())
        )
    }
}