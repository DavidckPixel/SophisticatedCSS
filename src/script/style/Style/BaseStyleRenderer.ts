/**
 * Base class for style editing menus
 */
class BaseStyleRenderer {
    /** The SelectorRenderer associated */
    selector: SelectorRenderer;

    constructor(selector: SelectorRenderer) {
        this.selector = selector;
    }

    updateModifier(el: Element, modifier: string | null, allModifs: string[]) {
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