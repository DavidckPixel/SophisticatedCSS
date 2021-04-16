
abstract class ViewComponent {
    private parent: ViewComponent | undefined;

    private location: Element | undefined;

    public allmounted: ViewComponent[] | undefined;

    protected state: any;
    
    protected abstract render(state: any): HTMLElement;

    /**
     * Mount the object to the DOM
     * 
     * @param dest The HTML element to mount it to
     */
    public mountTo(dest: Element|ViewComponent) {
        if (dest instanceof ViewComponent) {
            this.parent = dest;
            if(!dest.allmounted){
                dest.allmounted = [];
            }
            dest.allmounted.push(this);
        } else {
            this.location = dest.appendChild(this.doRender());
        }
    }

    /**
     * Execute a render cycle
     * 
     * @returns Rendered HTML nodes
     */
    public doRender(): HTMLElement {
        return this.render(this.state);
    }

    public executeStateFunction(func : Function){
        this.state.input.forEach((x : any) => func(x));
    }
    
    /**
     * Unmount the mounted object
     */
    public unmount() {
        this.location?.remove();
        delete this.location;
        delete this.parent;
    }

    public unmountAll(){
        if(this.allmounted){
            this.allmounted.forEach(x => {
                if(x instanceof ViewComponent){
                    x.unmount();
                }
            });
        }

        this.allmounted = [];
    }

    /**
     * Update the state of the component and re-render it
     * 
     * @param state 
     */
    public setState(state: any): void
    {
        // Update the state
        this.state = state;

        // If parented, update
        this.parent?.setState(this.parent.state);

        // If mounted, update
        if (this.location) {
            const content = this.doRender();
            this.location.replaceWith(content);
            this.location = content;
        }
    }

    /**
     * Create a HTML element node with properties and children
     * 
     * @param type The HTML element type.
     * @param props An object containing the properties for the element.
     * @param children The child nodes for the element.
     */
    protected create(type: string, props?: any, ...children: (Node|string)[]): HTMLElement | HTMLInputElement {
        // Create element
        let el = document.createElement(type);

        // Assign properties
        Object.assign(el, props);

        // Add children
        for (const child of children) {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            }
        }

        // Finally return new element
        return el;
    }
}