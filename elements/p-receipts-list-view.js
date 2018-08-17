import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-list.js';

export class PReceiptsListView extends LitElement {
    static get properties() {
        return {
            receipts: Array,
        };
    }
    _render({ receipts }) {
        return html`
            <style>
                :host {
                    display: block;
                    position: relative;
                }
                .fab {
                    position: absolute;
                    border: 0;
                    right: 16px;
                    bottom: 16px;
                    width: 48px;
                    height: 48px;
                    background: var(--primary-color);
                    border-radius: 50%;
                }
            </style>
            <p-receipts-list receipts="${receipts}"></p-receipts-list>
            <button class="fab">+</button>
        `;
    }
}

customElements.define('p-receipts-list-view', PReceiptsListView);
