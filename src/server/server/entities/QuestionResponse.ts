class QuestionResponse{

    private question : string;
    private user: string;
    private answer : string;

    constructor(question : string, user : string, answer : string){
        this.question = question;
        this.user = user;
        this.answer = answer;
    }

    public getQuestion() : string{
        return this.question;
    }

    public setQuestion(question : string){
        this.question = question;
    }

    public getUser() : string{
        return this.user;
    }

    public setUser(user : string){
        this.user = user;
    }

    public getAnswer() : string{
        return this.answer;
    }

    public setAnswer(answer : string){
        this.answer = answer;
    }
}