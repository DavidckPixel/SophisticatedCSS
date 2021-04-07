/// <reference path="./BaseStyleRenderer.ts" />

/**
 * TextStyle selector menu builder
 */
class TextStyleRenderer extends BaseStyleRenderer {
    /**
     * Render the menu, by appending a representation to the DOM.
     * 
     * @param rootElement The HTML element that the menu should be added to.
     */
    render(rootElement: Element) {
        const selectors: Array<[string, string | null, string]> = [
            ["Large", "--large", "20px"],
            ["Medium", null, "16px"],
            ["Small", "--small", "12px"],
        ]
        rootElement.classList.add("styleModifierElement--thin");

        const allModifs = selectors.map(([_, x]) => x).filter((x): x is string => x !== null);

        // Iterate over all elements in the menu
        for (const [title, modifier, fontSize] of selectors) {
            // Build and append the node
            let node = create("button", { "classList": "styleModifierElement__selectorText", "style": "font-size:" + fontSize }, text(title)) as HTMLButtonElement;
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
}