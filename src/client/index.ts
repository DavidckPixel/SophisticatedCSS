/// <reference path="./style/Selector/SelectorBuilder.ts" />
/// <reference path="./style/Selector/SelectorRenderer.ts" />
/// <reference path="./style/Style/TextStyleRenderer.ts" />
/// <reference path="./style/Style/ColorStyleRenderer.ts" />
/// <reference path="./quiz/Question/buildQuiz.ts" />
/// <reference path="./ajax.ts"/>
/// <reference path="./quiz/Quiz.ts" />
/// <reference path="./quiz/Topic.ts" />
/// <reference path="./quiz/QuizPageController.ts" />

if (document.querySelector('#quiz2')) {
    //const controller = new QuizPageController(await AsyncDynamicloadDoc("/api/session/", "GET"));
}

(async () =>{
    if(document.querySelector("#quiz2")){
        console.log("Loading Quiz page!!");
        let obj : any = await AsyncDynamicloadDoc("/api/session/", "GET")
        let quizs : any;
        if(obj){
        quizs= await AsyncDynamicloadDoc(`/assesment/quizAmount/${obj.lastQuiz}`, "GET")
        }
        else{
            quizs = null;
        }
        console.log("obj " + obj);
        const controller = new QuizPageController(obj, quizs);
    };
})();

// Get the menu nodes
let footerMenus = document.querySelectorAll("footer .footer__contributor");
if (footerMenus.length !== 3) {
    console.warn("Unknown page structure, page not loading.");
} else {
    // Clear the footer menu's
    for (const menu of footerMenus) {
        // Clone children property (since the property is modified when deleting a child)
        const children = [...menu.children];
        menu.classList.add("styleModifierElement")
        
        // Delete children
        for (const node of children) {
            menu.removeChild(node);
        }
    }

    // Menu nodes
    let selectorNode = footerMenus[0];
    let textStyleNode = footerMenus[1];
    let colorStyleNode = footerMenus[2];

    // Initialize the component selector menu
    let nodes = new SelectorBuilder();
    let data = nodes.build(document.body);
    let selector = new SelectorRenderer(data);
    let textStyle = new TextStyleRenderer(selector);
    let colorStyle = new ColorStyleRenderer(selector);
    selector.render(selectorNode);
    textStyle.render(textStyleNode);
    colorStyle.render(colorStyleNode);
}


