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
    },
    {
        "questionType": "multiplechoice",
        "title": "What is a possible risk of using a preprocessor?",
        "correctAnswer": "Dependency on one preprocessor language",
        "explanation": "By using a preprocessor, your stylesheets will be written in a non-standard language, unsupported by browsers. This means that you're depending on the continued support for your preprocessor language of choice. In practice, these preprocessors are open source and the lifetime of a project usually is smaller than the lifetime of a preprocessor, but it's a factor to consider.",
        "allAnswers": ["It has less functionality then normal CSS", "Code get’s overcomplicated", "Dependency on one preprocessor language", "Possibility that a browser won’t display your site correctly"]
    },
    {
        "questionType": "open",
        "title": "What symbol is used to define a variable in the pre-processor Less?",
        "correctAnswer": "@",
        "explanation": "When defining a variable in less, the programmer does this with the @ symbol followed by the name of the variable",
        "allAnswers": []
    },
    {
        "questionType": "open",
        "title": "Using the command line, what must the programmer type to convert the file layout.scss to a css file called “generated”?",
        "correctAnswer": "sass layout.scss generated.css",
        "explanation": "As Sass converts scss files into css files, this can be done through a variety of methods, the simplest one being the command line. The command begins with Sass, stating that it is a sass command, followed by the name of the file the user wants to convert, and lastly the name of the file that needs to be generated.",
        "allAnswers": []
    }
]