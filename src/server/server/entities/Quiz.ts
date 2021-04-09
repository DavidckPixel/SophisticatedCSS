class Quiz
{
    private id : string;
    private topicid : string;
    private title : string;

    constructor(id : string, title : string, topicid : string)
    {
        this.id = id;
        this.title = title;
        this.topicid = topicid;
    }

    public getId() : string{
        return this.id;
    }

    public setId(id : string){
        this.id = id;
    }

    public getTopicId() : string{
        return this.topicid;
    }

    public setTopicId(topicid : string){
        this.topicid = topicid;
    }

    public getTitle() : string{
        return this.title;
    }

    public setTitle(title : string){
        this.title = title;
    }
}