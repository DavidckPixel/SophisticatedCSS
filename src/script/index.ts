/// <reference path="./Selector/SelectorBuilder.ts" />
/// <reference path="./Selector/SelectorRenderer.ts" />
/// <reference path="./TextStyleRenderer.ts" />
/// <reference path="./ColorStyleRenderer.ts" />

// Get the menu nodes
let footerMenus = document.querySelectorAll("footer .footer__contributor");
if (footerMenus.length !== 3) {
    console.log(footerMenus);
    throw new Error("Unknown page structure, page not loading.");
} else {
    // Clear the footer menu's
    for (const menu of footerMenus) {
        // Clone children property (since the property is modified when deleting a child)
        const children = [...menu.children];

        // Delete children
        for (const node of children) {
            menu.removeChild(node);
        }
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