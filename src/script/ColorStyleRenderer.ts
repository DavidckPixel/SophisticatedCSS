/**
 * TextStyle selector menu builder
 */
class ColorStyleRenderer
{
    /* The SelectorRenderer associated */
    selector: SelectorRenderer;

    constructor(selector: SelectorRenderer) {
        this.selector = selector;
    }

    /**
     * Set the text color for the currently selected element.
     * 
     * @param style The text color that's being set. 
     */
    setStyle(style: string) {
        const currentElement = this.selector.current;
        if (currentElement) {
            currentElement.style.color = style;
        }

        // todo: change visual indicator of current element
    }
 
    /**
     * Render the menu, by appending a representation to the DOM.
     * 
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement: Element) {
        const selectors = [
            ["Black", "black"],
            ["White", "white"],
        ]

        // Iterate over all elements in the menu
        for (const [title, fontSize] of selectors) {
            // Build and append the node
            let node = document.createElement('button');
            node.style.fontSize = fontSize;
            node.appendChild(document.createTextNode(title));
            node.addEventListener("click", (event: MouseEvent) => {
                this.setStyle(fontSize);
            });
            rootElement.appendChild(node);
        }
    }
}