/**
 * Component selector menu builder
 */
class SelectorRenderer
{
    /* The internal representation of the menu */
    elements: Array<[HTMLElement, string, number]>;

    /* The currenly selected menu item */
    current?: HTMLElement;

    constructor(elements: Array<[HTMLElement, string, number]>) {
        this.elements = elements;
    }

    /**
     * Set the currently selected menu item.
     * 
     * @param el The HTML element that's being selected (not the button, the element that's represented by the button). 
     */
    setElement(el?: HTMLElement) {
        this.current = el;

        // todo: change visual indicator of current element
    }

    /**
     * Render the menu, by appending a representation to the DOM.
     * 
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement: HTMLElement) {
        // Iterate over all elements in the menu
        for (const [element, title, depth] of this.elements) {
            // Build and append the node
            let text = "&emsp;".repeat(depth) + title;
            let node = document.createElement('button');
            node.appendChild(document.createTextNode(text));
            node.addEventListener("click", (event: MouseEvent) => {
                this.setElement(element);
            });
            rootElement.appendChild(node)
        }
    }
}