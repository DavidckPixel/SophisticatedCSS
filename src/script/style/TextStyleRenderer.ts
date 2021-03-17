/**
 * TextStyle selector menu builder
 */
class TextStyleRenderer
{
    /** The SelectorRenderer associated */
    selector: SelectorRenderer;

    constructor(selector: SelectorRenderer) {
        this.selector = selector;
    }

    /**
     * Set the text size for the currently selected element.
     * 
     * @param style The font-size that's being set. 
     */
    setStyle(style: string) {
        if (this.selector.current) {
            const [_, currentElement] = this.selector.current;
            currentElement.style.fontSize = style;
        }

        // todo: change visual indicator of current element
    }
 
    /**
     * Render the menu, by appending a representation to the DOM.
     * 
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement: Element) {
        const selectors: Array<[string, string|null, string]> = [
            ["Large", "--large", "25px"],
            ["Medium", null, "21px"],
            ["Small", "--small", "16px"],
        ]

        const allModifs = selectors.map(([_, x]) => x).filter((x): x is string => x !== null);

        // Iterate over all elements in the menu
        for (const [title, modifier, fontSize] of selectors) {
            // Build and append the node
            let node = document.createElement('button');
            node.style.fontSize = fontSize;
            node.appendChild(document.createTextNode(title));
            node.addEventListener("click", (event: MouseEvent) => {
                // If a page element is selected
                if (this.selector.current) {
                    const [_, el] = this.selector.current;
                    this.updateModifier(el, modifier, allModifs);
                }
            });
            rootElement.appendChild(node);
        }
    }
    
    updateModifier(el: Element, modifier: string|null, allModifs: string[]) {
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

        // Run recursively
        for (const node of el.children) {
            this.updateModifier(node, modifier, allModifs);
        }
    }
}