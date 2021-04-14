/// <reference path="./Topic.ts" />
/// <reference path="../component/ViewComponent.ts" />

class TopicOverview extends ViewComponent{
    constructor(topics : Topic[]){
        super();
        
        for (const topic of topics) {
            topic.mountTo(this);
        } 
        
        this.setState({
            topics: topics
        });
    }

    public render(state: any): HTMLElement {
        return this.create("div", {}, 
            ...state.topics.map((x : Topic) => x.doRender())
        )
    }
}