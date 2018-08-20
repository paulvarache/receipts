import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { updateUser } from '../lib/actions.js';
import { cachedQuerySelector } from '../lib/dom-query-cache.js';

export class PReceiptsUserView extends LitElement {
    static get properties() {
        return {
            user: Object,
        };
    }
    _render({ user = {} }) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                input {
                    font-size: 28px;
                    border: 0px;
                    border-bottom: 1px solid grey;
                    text-align: center;
                    width: 192px;
                    height: 38px;
                    border: 2px solid grey;
                    border-radius: 8px;
                    outline: none;
                }
            </style>
            <input id="input" type="text" autofocus value=${user.name}/>
        `;
    }
    get inputEl() {
        return cachedQuerySelector(this.shadowRoot, '#input');
    }
    enter() {
        this.inputEl.focus();
    }
    leave() {
        const user = this.inputEl.value;
        app.api.getUser(user)
            .then(uid => updateUser({ id: uid, name: user }));
    }
}

customElements.define('p-receipts-user-view', PReceiptsUserView);
