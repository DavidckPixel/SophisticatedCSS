/// <reference path="./Selector/SelectorBuilder.ts" />
/// <reference path="./Selector/SelectorRenderer.ts" />

// Get the menu node
function buildSelector() {
    // TODO: retrieve menu node
    let menuNode = document.currentScript?.parentElement;
    if (!menuNode) {
        throw new Error("buildSelector() can't be run from an event handler, timeout or module");
    }

    // Initialize the component selector menu
    let nodes = new SelectorBuilder();
    let data = nodes.build(document.body);
    console.log(data);
    let renderer = new SelectorRenderer(data);
    renderer.render(menuNode);
}