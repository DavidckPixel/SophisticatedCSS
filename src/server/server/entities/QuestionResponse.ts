class QuestionResponse{

    private question : string;
    private user: string;
    private answer : string;

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