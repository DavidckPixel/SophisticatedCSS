class QuestionChoice{

    private id : string;
    private question: string;
    private statement : string;
    private choiceValue : string;

    public getId() : string{
        return this.id;
    }

    public setId(id : string){
        this.id = id;
    }

    public getQuestion() : string{
        return this.question;
    }

    public setQuestion(question : string){
        this.question = question;
    }

    public getStatement() : string{
        return this.statement;
    }

    public setStatement(statement : string){
        this.statement = statement;
    }

    public getChoiceValue() : string{
        return this.choiceValue;
    }

    public setChoiceValue(choiceValue : string){
        this.choiceValue = choiceValue;
    }
}