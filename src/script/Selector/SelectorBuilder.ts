/**
 * Component selector data builder
 */
class SelectorBuilder
{
    /* The cache of the data being built, containing the element and element depth */
    elements: Array<[HTMLElement, number]>;

    constructor() {
        this.elements = [];
    }

    /**
     * Finds and appends elements to the element cache of a certain element.
     * 
     * @param rootElement The HTML element whose children should be searched.
     * @param depth The relative depth of the searched children.
     */
    buildFor(rootElement: Element, depth: number = 0) {
        // Iterate over all children
        for (const element of rootElement.children) {
            // TODO: detect egligable elements

            this.buildFor(element, depth);
        }
    }

    /**
     * Finds a builds a menu representation of a certain element and their children.
     * 
     * @param rootElement The element that should be searched recursively.
     */
    build(rootElement: HTMLElement): Array<[HTMLElement, number]> {
        // Build result
        this.buildFor(rootElement);
        const result = this.elements;

        // Clear data and return result
        this.elements = [];
        return result;
    }
}