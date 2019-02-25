import {render, html} from 'lighterhtml';

class TestElement extends HTMLElement {
	constructor() {
		super();

		render(this.attachShadow({mode: 'open'}), () => html`
			Test text
		`);
	}
}

customElements.define('test-element', TestElement);
