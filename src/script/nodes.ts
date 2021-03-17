/**
 * Create a HTML element node with properties and children
 * 
 * @param type The HTML element type.
 * @param props An object containing the properties for the element.
 * @param children The child nodes for the element.
 */
 function create(type: string, props?: any, ...children: Node[]): HTMLElement | HTMLInputElement{
    // Create element
    let el = document.createElement(type);

    // Assign properties
    Object.assign(el, props);

    // Add children
    for (const child of children) {
        el.appendChild(child);
    }

    // Finally return new element
    return el;
}

/**
 * Shorthand for document.createTextNode
 * 
 * @param content The text content for the node.
 */
function text(content: string): Text {
    return document.createTextNode(content);
}

/**
 * Additon to create function by adding eventListener
 * 
 * @param eventType Type of event
 * @param func  Function to be executed when event occurs
 * @param bool  True/False variable
 * @param el HTMLElement towhich eventlistener will be added
 * @returns HTMLElement containing eventlistener
 */
function createEventObj(eventType : string, func : any, bool : boolean, el : HTMLElement) : HTMLElement | HTMLInputElement {
    el.addEventListener(eventType,func, bool);
    return el;
}
