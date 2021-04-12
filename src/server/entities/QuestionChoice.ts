export default class QuestionChoice{

    private id : string;
    private question: string;
    private statement : string;
    private choiceValue : string;

    constructor(id : string, question : string, statement : string, choiceValue : string){
        this.id = id;
        this.question = question;
        this.statement = statement;
        this.choiceValue = choiceValue;
    }

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