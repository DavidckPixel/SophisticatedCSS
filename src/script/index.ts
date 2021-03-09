import "./Selector/SelectorBuilder";
import "./Selector/SelectorRenderer";

// Get the menu node
// TODO: retrieve menu node
let menuNode = document.body;

// Initialize the component selector menu
let nodes = new SelectorBuilder();
let renderer = new SelectorRenderer(nodes.build(document.body));
renderer.render(menuNode);