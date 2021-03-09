/// <reference path="./Selector/SelectorBuilder.ts" />
/// <reference path="./Selector/SelectorRenderer.ts" />

// Get the menu node
// TODO: retrieve menu node
let menuNode = document.body;

// Initialize the component selector menu
let nodes = new SelectorBuilder();
let data = nodes.build(document.body);
console.log(data);
let renderer = new SelectorRenderer(data);
renderer.render(menuNode);