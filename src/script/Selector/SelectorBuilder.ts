/**
 * Component selector data builder
 */
class SelectorBuilder
{
    /* The cache of the data being built, containing the element, title and element depth */
    elements: Array<[HTMLElement, string, number]>;

    constructor() {
        this.elements = [];
    }

    /**
     * Tries to retrieve the first text from the children in a HTML element.
     * 
     * @param rootElement 
     */
    getTitle(rootElement: HTMLElement): string | null {
        for (const element of rootElement.childNodes) {
            // If node is text node, return its value
            if (element.nodeType === Node.TEXT_NODE) {
                return rootElement.innerText;
            }

            // Recursively call
            if (element instanceof HTMLElement) 
                this.getTitle(element);
        }

        return null;
    }

    /**
     * Finds and appends elements to the element cache of a certain element.
     * 
     * @param rootElement The HTML element whose children should be searched.
     * @param depth The relative depth of the searched children.
     */
    buildFor(rootElement: HTMLElement, depth: number = 0) {
        // Iterate over all children
        for (const element of rootElement.children) {
            // Type guard for HTMLElement
            if (!(element instanceof HTMLElement)) 
                throw new Error(`Expected e to be an HTMLElement, was ${element && element.constructor && element.constructor.name || element}`);

            // Detect egligable elements
            if (element.hasAttribute("id")) {
                let title = this.getTitle(element) ?? "Onbekend";
                this.elements.push([element, title, depth + 1]);
            }

            // Recursively call
            this.buildFor(element, depth);
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