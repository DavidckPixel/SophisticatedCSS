class QuizPageController {

    private bodyElement : QuizBody;
    private currentQuestion : string;
    private currentQuiz : string;
    private body : HTMLElement | null;

    constructor(){
        this.bodyElement = new QuizBody();

        this.currentQuestion = "";
        this.currentQuiz = "";

        this.body = document.querySelector("body");
        if(!this.body){
            console.log("Body was not found");
            return;
        }

        this.buildSelectScreen();
    }

    private buildSelectScreen(){   
        DynamicloadDoc("/assesment/topics/id1", (quizObjs : any[]) =>  {
            console.log("Length of quizes: " + quizObjs.length);
            const quizes = quizObjs.map(quiz => new Quiz(quiz.title, quiz.id, quiz.topicid));
            const allquizes = new QuizOverview(quizes, this);
            quizes.forEach(x => x.setQuizMgr(allquizes));
            
            DynamicloadDoc("/assesment/topics", (topicObjs : any[]) =>  {
                console.log("Length of topics: " + topicObjs.length);
                const topics = topicObjs.map(x => new Topic(x.title, x.id, allquizes));
                console.log(topics);
                const alltopics = new TopicOverview(topics);

                alltopics.mountTo(this.bodyElement);
                allquizes.mountTo(this.bodyElement);

                if(this.body){
                    this.bodyElement.mountTo(this.body);
                }
            });
        });
    }

    private buildQuestionScreen()
    {
        DynamicloadDoc(`/assesment/${this.currentQuiz}/${this.currentQuestion}`, (Objs : any) =>  {
            console.log(Objs);
            const questionElement = new QuestionElement(Objs.id, Objs.quizid, Objs.type, Objs.title, Objs.statement);
            questionElement.mountTo(this.bodyElement);

            this.bodyElement.doRender();

            console.log(this.bodyElement.allmounted);
    });
    }

    public selectedQuiz(quizid : string){
        this.currentQuiz = quizid;
        this.currentQuestion = "id1";

        this.bodyElement.unmountAll();
        this.buildQuestionScreen();
    }

    public switchQuestion(){
        this.currentQuestion = "id1";

        this.bodyElement.unmountAll();
        this.buildQuestionScreen();
    }
}