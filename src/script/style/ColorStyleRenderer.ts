/**
 * TextStyle selector menu builder
 */
class ColorStyleRenderer
{
    /** The SelectorRenderer associated */
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
        if (this.selector.current) {
            const [_, currentElement] = this.selector.current;
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
        const selectors: Array<[string, string|null]> = [
            ["Default colors", null],
            ["Inverted colors", "--invert"],
        ]

        const allModifs = selectors.map(([_, x]) => x).filter((x): x is string => x !== null);

        // Iterate over all elements in the menu
        for (const [title, modifier] of selectors) {
            // Build and append the node
            let node = document.createElement('button');
            node.appendChild(document.createTextNode(title));
            node.addEventListener("click", (event: MouseEvent) => {
                // If a page element is selected
                if (this.selector.current) {
                    const [_, el] = this.selector.current;

                    // Remove all current modifier classes detected
                    const removal = [...el.classList].filter(cls => allModifs.some(modif => cls.endsWith(modif)));
                    for (const cls of removal) {
                        el.classList.remove(cls);
                    }

                    // Add modifier copy to all classes
                    if (modifier) {
                        for (const cls of [...el.classList].filter(x => !x.includes("--"))) {
                            el.classList.add(cls + modifier);
                        }
                    }
                }
            });
            rootElement.appendChild(node);
        }
    }
}