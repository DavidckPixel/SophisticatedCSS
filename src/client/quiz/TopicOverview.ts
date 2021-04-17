/// <reference path="./Topic.ts" />
/// <reference path="../component/ViewComponent.ts" />

class TopicOverview extends ViewComponent{
    private alltopics : Topic[];
    private quizMgr : QuizPageController;

    constructor(topics : Topic[], quizMgr : QuizPageController){
        super();

        this.quizMgr = quizMgr;
        
        for (const topic of topics) {
            topic.mountTo(this);
        } 
        
        this.setState({
            topics: topics,
            input: topics
        });

        this.alltopics = topics;
    }

    public render(state: any): HTMLElement {
        let loginout : HTMLElement;  

        return create("section", {}, create("section", { "classList": "intro", "id": "introduction", "selectorTitle": "Introduction" },
        create("img", { "classList": "intro__img", "src": "image/testimage.png" }),
        create("div", { "classList": "intro__text" },
            create("h1", { "classList": "intro__header" }, text("Test Your knowledge!")),
            create("p", { "classList": "intro__paragraph" }, text("on this page you can test your knowledge about pre processors! all information about the topics in this quiz can be found on the website. After u filled in the answer, it will give a short explanation why the answer was right (or wrong) combined with a link to where this information could be found."))
        )),
        this.create("section", {"classList" : "allTopics"},                    
                    this.create("div", {"classList" : "two-col"},
                    this.create("h2", {"classList" : "allTopics__title"}, "Topics"),
            ...state.topics.map((x : Topic) => x.doRender())
        )))
    };

    public setTopic(obj? : Topic) {
        
        if(obj){
            this.alltopics.forEach(element => element.setUnSelected());
            this.quizMgr.setTopicInfo(obj.descriptor)
            obj.setSelected();
        }
    }

}