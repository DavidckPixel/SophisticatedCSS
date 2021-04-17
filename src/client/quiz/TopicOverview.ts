/// <reference path="./Topic.ts" />
/// <reference path="../component/ViewComponent.ts" />

class TopicOverview extends ViewComponent{
    private alltopics : Topic[];

    constructor(topics : Topic[]){
        super();
        
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
        if(this){ /// should be if authenticated
            loginout = create("div", {"classList" : "container"},create("div", {"classList": "blackBlock blackBlock--label loginoutbox inputSet"}, 
            create( "input", {"type": "button", "value": "logout", "classList": "inputSet__button", 
            onclick : () =>{
                //logout
                }  })))
        }
        else{
            loginout = create("div", {"classList" : "container"},create("div", {"classList": "blackBlock blackBlock--label loginoutbox inputSet"}, 
            create( "input", {"type": "button", "value": "log in!", "classList": "inputSet__button", 
            onclick : () =>{
                //redirect to login page
                }  })))
        }

        

        return create("section", {}, loginout, create("section", { "classList": "intro", "id": "introduction", "selectorTitle": "Introduction" },
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
            obj.setSelected();
        }
    }

}