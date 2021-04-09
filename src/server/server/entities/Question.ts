class Question
{
    private id : string;
    private quizid : string;
    private type : string;
    private title : string;
    private statement : string;
    private correct : string;

    constructor(id : string, quizid : string, type : string, title : string, statement : string, correct : string)
    {
        this.id = id;
        this.quizid = quizid;
        this.type = type;
        this.title = title;
        this.statement = statement;
        this.correct = correct;
    }

    public getId() : string{
        return this.id;
    }

    public setId(id : string){
        this.id = id;
    }

    public getQuizId() : string{
        return this.quizid;
    }

    public setQuizId(quizid : string){
        this.quizid = quizid;
    }

    public getType() : string{
        return this.type;
    }

    public setType(type : string){
        this.type = type;
    }

    public getTitle() : string{
        return this.title;
    }

    public setTitle(title : string){
        this.title = title;
    }

    public getStatement() : string{
        return this.statement;
    }

    public setStatement(statement : string){
        this.statement = statement;
    }

    public getCorrect() : string{
        return this.correct;
    }

    public setCorrect(correct : string){
        this.correct = correct;
    }
}