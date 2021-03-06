/**
 * Component selector data builder
 */
class SelectorBuilder {
    /** The cache of the data being built, containing the element, title and element depth */
    elements: Array<[HTMLElement, string, number]>;

    constructor() {
        this.elements = [];
    }

    /**
     * Find and append DOM elements to the element cache if they have an id assigned.
     * 
     * @param rootElement The HTML element whose children should be searched.
     * @param depth The relative depth of the searched children.
     */
    buildFor(rootElement: HTMLElement, depth: number = 0) {
        // Iterate over all children
        for (const element of rootElement.children) {
            // Type guard for HTMLElement
            if (!(element instanceof HTMLElement))
                throw new Error(`Expected element to be an HTMLElement, was ${element?.constructor?.name ?? element}`);

            // Detect egligable elements and add them to the elements cache
            let title = element.getAttribute("selectorTitle")
            let childDepth = depth;
            if (title) {
                childDepth++;
                this.elements.push([element, title, depth]);
            }

            // Recursively call
            this.buildFor(element, childDepth);
        }
    }

    /**
     * Finds a builds a menu representation of a certain element and their children.
     * 
     * @param rootElement The element that should be searched recursively.
     */
    build(rootElement: HTMLElement): Array<[HTMLElement, string, number]> {
        // Build result
        this.buildFor(rootElement);
        const result = this.elements;

        // Clear data and return result
        this.elements = [];
        return result;
    }
}