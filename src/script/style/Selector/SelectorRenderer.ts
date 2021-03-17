/**
 * Component selector menu builder
 */
class SelectorRenderer
{
    /** The internal representation of the menu */
    elements: Array<[HTMLElement, string, number]>;
    
    /** The currenly selected menu item, and the corresponding element it represents  */
    current?: [HTMLElement, HTMLElement];

    constructor(elements: Array<[HTMLElement, string, number]>) {
        this.elements = elements;
    }

    /**
     * Set the currently selected menu item.
     * 
     * @param el The HTML element that's being selected (not the button, the element that's represented by the button). 
     */
    setElement(selector: HTMLElement, element: HTMLElement) {
        const indicator = " ←";

        // Revert title of previously selected element
        if (this.current) {
            const [prevSelector, _] = this.current;
            const textNode = prevSelector.childNodes[0];
            const text = textNode.textContent;
            
            // If string ends with indicator marking, remove it
            if (text?.endsWith(indicator)) {
                textNode.nodeValue = text.slice(0, text.length - indicator.length);
            }
        }

        // Set currently selected element
        this.current = [selector, element];

        // Change title of new selected element
        selector.childNodes[0].textContent += indicator;
    }

    /**
     * Render the menu, by appending a representation to the DOM.
     * 
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement: Element) {
        // Iterate over all elements in the menu
        for (const [element, title, depth] of this.elements) {
            // Build and append the node
            let text = "\u2003".repeat(depth) + title;
            let node = document.createElement('a');
            let id = element.getAttribute("id");
            node.style.display = "block";
            node.classList.add("styleModifierElement__selectorText")
            node.appendChild(document.createTextNode(text));
            node.addEventListener("click", (event: MouseEvent) => {
                event.preventDefault();
                this.setElement(node, element);
            });
            if (id) {
                node.href = "#" + id;
            }
            rootElement.appendChild(node);
        }
    }
}