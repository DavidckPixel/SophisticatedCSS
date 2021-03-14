
var allQuestions =[
    {
        "questionType": "multiplechoice",
        "title": "Which operator is not included in Sass?",
        "correctAnswer": "^ operator (exponentiation)",
        "explanation": "The power operator is not included.",
        "allAnswers": ["* operator (multiplication)", "+ operator (addition)", "% operator (modulus)", "^ operator (exponentiation)"]
    },
    {
        "questionType": "multiplechoice",
        "title": "What is not a function of a pre-processor?",
        "correctAnswer": "Make your site load faster",
        "explanation": "all code written with pre processor will be converted into CSS files and could have been written without pre Processors",
        "allAnswers": ["Make your code more readable", "Make your site load faster", "You have to write less code", "Add more functionality"]
    }
];

function buildQuiz(){

    //var allQuestionsArray = JSON.parse(allQuestions);

    for(var x=0; x<allQuestions.length && x<6; x++) {
        //for each question you want to build
        
        var thisQuestion = allQuestions[x];
        var newQuestion;
        //var newQuestion = new Question(thisQuestion.correctAnswer, thisQuestion.title, thisQuestion.explanation, "test")
        console.log("IS THIS WORKING?!?!")
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