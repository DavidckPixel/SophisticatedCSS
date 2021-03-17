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


        rootElement.classList.add("styleModifierElement--thin");

        const allModifs = selectors.map(([_, x]) => x).filter((x): x is string => x !== null);

        // Iterate over all elements in the menu
        for (const [title, modifier] of selectors) {
            // Build and append the node
            let node = create("button", {"classList": "styleModifierElement__selectorText"}, text(title)) as HTMLButtonElement;
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
        // Find all modifier classes that are applied by this menu and remove them
        const removal = [...el.classList].filter(cls => allModifs.some(modif => cls.endsWith(modif)));
        for (const cls of removal) {
            el.classList.remove(cls);
        }

        // Add modifier copy to all classes
        if (modifier) {
            // Select all classes that are not BEM modifiers
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