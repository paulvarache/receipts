import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-receipt.js'

export class PReceiptsList extends LitElement {
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
                }
                p-receipts-receipt {
                    border-bottom: 1px solid lightgray;
                }
                p-receipts-receipt:first-of-type {
                    border-top: 1px solid lightgray;
                }
            </style>
            <div class="list">
                ${receipts.map(({ value, type }) => html`
                    <p-receipts-receipt value=${value} type=${type}></p-receipts-receipt>
                `)}
            </div>
        `;
    }
}

customElements.define('p-receipts-list', PReceiptsList);
