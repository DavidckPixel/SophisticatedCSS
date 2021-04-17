/// <reference path="./QuizBody.ts" />

class QuizPageController {

    private bodyElement : QuizBody;
    private currentQuestion : string;
    private currentQuiz : string;
    private quizCounter : number;
    private body : HTMLElement | null;
    private currentQuizQuestions : string[];
    public topicinfo : string = "";

    constructor(obj : any, currentQuizQuestions? : any[]){
        this.bodyElement = new QuizBody();

        this.currentQuestion = "";
        this.currentQuiz = "";
        this.currentQuizQuestions = [];
        this.quizCounter = 0;

        this.body = document.getElementById("quizSection")
        if(!this.body){
            console.log("Body was not found");
            return;
        }

        console.log("obj : " + obj);

        this.bodyElement.mountTo(this.body);

        if(obj){
            console.log("Seeing if there is an old session");

            console.log(obj.lastQuestion + " LALA " + obj.lastQuiz)

            if(obj.lastQuestion && obj.lastQuiz){

                console.log("old session found");
                this.currentQuiz = obj.lastQuiz;
                this.currentQuestion = obj.lastQuestion;

                if(currentQuizQuestions){
                    this.currentQuizQuestions = currentQuizQuestions
                }
                else{
                    this.currentQuizQuestions = [];
                }
                console.log(this.currentQuizQuestions);
                console.log(this.currentQuestion);
                this.quizCounter = this.currentQuizQuestions.findIndex(x => x == this.currentQuestion);

                if(this.quizCounter == -1){
                    console.log("you should not come here");
                    this.buildSelectScreen();
                }
                else{
                    console.log("Building old question!")
                    this.switchQuestion();
                    }
            }
            else{
                console.log("No old session available in questions");
                this.buildSelectScreen();
            }
        }
        else
        {   
            console.log("Noone was logged in!")
            this.buildSelectScreen();
        }
    }

    private async buildSelectScreen(){   
        DynamicloadDoc("/assesment/topics/id1", (quizObjs : any[]) =>  {
            console.log("Length of quizes: " + quizObjs.length);
            const quizes = quizObjs.map(quiz => new Quiz(quiz.title, quiz.id, quiz.topicid));
            const allquizes = new QuizOverview(quizes, this);
            quizes.forEach(x => x.setQuizMgr(allquizes));
            
            DynamicloadDoc("/assesment/topics", (topicObjs : any[]) =>  {
                console.log("Length of topics: " + topicObjs.length);
                const topics = topicObjs.map(x => new Topic(x.title, x.id, allquizes, x.descriptor));
                console.log(topics);
                const alltopics = new TopicOverview(topics, this);
                topics.forEach(element => element.giveOverview(alltopics));
                alltopics.mountTo(this.bodyElement);
                allquizes.mountTo(this.bodyElement);

                if(this.body){
                    this.bodyElement.mountTo(this.body);
                }
            });
        });
    }

    private async buildQuestionScreen()
    {
        DynamicloadDoc(`/assesment/${this.currentQuiz}/${this.currentQuestion}`, (Objs : any) =>  {
            const questionElement = new QuestionElement(Objs.id, Objs.quizid, Objs.type, Objs.title, Objs.statement, this);
            questionElement.mountTo(this.bodyElement);

            this.bodyElement.doRender();

            console.log(this.bodyElement.allmounted);
    });
    }

    async getQuizQuestions(){
        let objs : any = await AsyncDynamicloadDoc(`/assesment/quizAmount/${this.currentQuiz}`, "GET");
        this.currentQuizQuestions = objs;
    }


    public selectedQuiz(quizid : string){
        this.currentQuiz = quizid;
        this.quizCounter = 0;
        
        DynamicloadDoc(`/assesment/quizAmount/${this.currentQuiz}`, (Objs : any) =>  {
            this.currentQuizQuestions = Objs;

            if(this.currentQuizQuestions == [])
            { 
                console.log("quiz holds no questions");
                return;
            }
    
            this.switchQuestion();
        });
    }

    public switchQuestion(){
        this.currentQuestion = this.currentQuizQuestions[this.quizCounter];

        console.log("current question ID: " + this.currentQuestion);
        PostDynamicloadDoc("/api/session/current", this.currentQuestion, (Objs : any) => {});

        this.bodyElement.unmountAll();
        this.buildQuestionScreen();

        this.bodyElement.doRender();
    }

    public nextQuestion(){
        if(this.quizCounter + 1 >= this.currentQuizQuestions.length){
            this.returnTopicSelect();
        }
        else{ 
            this.quizCounter++;
            this.switchQuestion();
        }
    }

    public previousQuestion(){
        if(this.quizCounter - 1 < 0){
            this.returnTopicSelect();
        }
        else{ 
            this.quizCounter--;
            this.switchQuestion();
        }
    }

    public async returnTopicSelect(){
        this.topicinfo = "";
        this.currentQuiz = "";
        this.currentQuestion="";

        this.bodyElement.unmountAll();
        this.bodyElement.unmount();
        await this.buildSelectScreen();

        this.bodyElement.doRender();
    }

    public setTopicInfo(topic : string){
        this.topicinfo = topic;
    }
}