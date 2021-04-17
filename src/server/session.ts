export interface QuizSessionData
{
    lastQuestion : string | null;
    questionValid : number;
    questionTotal : number;
}

export default class QuizSession
{
    public static create(lastQuestion : string | null = null): QuizSessionData
    {
        return {
            lastQuestion: lastQuestion,
            questionValid: 0,
            questionTotal: 0,
        };
    }

    public static addAnswer(session : QuizSessionData, valid: boolean): QuizSessionData {
        if (valid) {
            session.questionValid++;
        }
        
        session.questionTotal++;
        return session;
    }
}