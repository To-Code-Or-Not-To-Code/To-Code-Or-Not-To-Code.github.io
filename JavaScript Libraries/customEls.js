class NavbarItem extends HTMLElement {
    render() {
        let frag = document
            .createRange()
            .createContextualFragment(this.getAttribute("svg"));
        let a = document.createElement("a");
        a.classList.add("nav-link", "fa-primary");
        a.href = this.getAttribute("href");
        let span = document.createElement("span");
        span.classList.add("link-text", "fa-primary");
        span.textContent = this.textContent;
        this.innerHTML = "";
        a.appendChild(frag);
        a.appendChild(span);
        this.appendChild(a);
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() {
        return ["href", "svg", "class", "id"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}

customElements.define("navbar-item", NavbarItem);
