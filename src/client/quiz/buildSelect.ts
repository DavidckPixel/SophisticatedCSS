function buildSelectScreen(){
    const body = document.querySelector("body");

    if(!body){
        console.log("Body was not found");
        return;
    }

    console.log("body located, beginnin creation of buildSelect");

    DynamicloadDoc("/assesment/topics", (objects : any[]) =>  {
        console.log("Length of topics: " + objects.length);
        alltopics = new AllTopics(objects);
    });

    DynamicloadDoc("/assesment/topics/id1", (objects : any[]) =>  {
        console.log("Length of topics: " + objects.length);
        allquizes = new AllQuizes(objects);
    });
}

var alltopics : AllTopics;
var allquizes : AllQuizes;