import { Session } from "express-session";

export interface QuizSessionData
{
    lastQuestion : string | null;
    lastQuiz : string | null;
    questionValid : number;
    questionTotal : number;
}

export default class QuizSession
{
    public static create(): QuizSessionData
    {
        return {
            lastQuiz: null,
            lastQuestion: null,
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

export type SessionWithQuiz = Session & {
    quiz: QuizSessionData | undefined
};