/*function buildSelectScreen(){
    const body = document.querySelector("body");

    if(!body){
        console.log("Body was not found");
        return;
    }

    DynamicloadDoc("/assesment/topics/id1", (quizObjs : any[]) =>  {
        console.log("Length of quizes: " + quizObjs.length);
        const quizes = quizObjs.map(quiz => new Quiz(quiz.title, quiz.id, quiz.topicid));
        const allquizes = new QuizOverview(quizes);
        quizes.forEach(x => x.setQuizMgr(allquizes));
        
        DynamicloadDoc("/assesment/topics", (topicObjs : any[]) =>  {
            console.log("Length of topics: " + topicObjs.length);
            const topics = topicObjs.map(x => new Topic(x.title, x.id, allquizes));
            console.log(topics);
            const alltopics = new TopicOverview(topics);
            
            alltopics.mountTo(body);
            allquizes.mountTo(body);
        });
    });
} */

function buildQuizPage(){
    const controller = new QuizPageController();
}