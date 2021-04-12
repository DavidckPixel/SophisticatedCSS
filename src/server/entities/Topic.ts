export default class Topic
{
    private id : string; 
    private title : string;
    private descriptor : string;

    constructor(id : string, title : string, descriptor : string)
    {
        this.id = id;
        this.title = title;
        this.descriptor = descriptor;
    }

    public getId() : string{
        return this.id;
    }

    public setId(id : string){
        this.id = id;
    }

    public getTitle() : string{
        return this.title;
    }

    public setTitle(title : string){
        this.title = title;
    }

    public getDescriptor() : string{
        return this.descriptor;
    }

    public setDescriptor(descriptor : string){
        this.descriptor = descriptor;
    }
}