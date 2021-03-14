
function buildQuiz(){

    //var allQuestionsArray = JSON.parse(allQuestions);

    for(var x=0; x<allQuestions.length && x<5; x++) {
        //for each question you want to build
        
        var thisQuestion = allQuestions[x];
        var newQuestion;
        //var newQuestion = new Question(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation, "test")        
        if (thisQuestion.questionType == "multiplechoice")
        {
            //if it's a multiplechoice question
            newQuestion = new Multiplechoice(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.allAnswers);

        }
        else if(thisQuestion.questionType == "open")
        {
            //if it's a open question
            newQuestion = new Open(thisQuestion.correctAnswer, thisQuestion.title);
        }
    }
}