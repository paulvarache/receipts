import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { RECEIPT_LABELS, RECEIPT_ICONS } from '../lib/types.js';

import './p-money.js';

export class PReceiptsReceipt extends LitElement {
    static get properties() {
        return {
            type: Number,
            value: Number,
        };
    }
    _render({ type, value }) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: row;
                    padding: 16px 16px;
                    justify-content: space-between;
                    align-items: center;
                }
                .icon svg {
                    width: 32px;
                    height: 32px;
                }
                .label {
                    flex: 1;
                    padding-left: 32px;
                }
            </style>
            <div class="icon">${RECEIPT_ICONS[type]}</div>
            <div class="label">${RECEIPT_LABELS[type]}</div>
            <p-money value=${value}></p-money>
            
        `;
    }
}

customElements.define('p-receipts-receipt', PReceiptsReceipt);
