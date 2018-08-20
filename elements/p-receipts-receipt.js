import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { TYPE_LABELS } from '../lib/types.js';

import './p-money.js';

function typeToLabel(type) {
    return TYPE_LABELS[type];
}

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
                    padding: 16px 8px;
                    justify-content: space-between;
                    align-items: center;
                }
            </style>
            <div>${typeToLabel(type)}</div>
            <p-money value=${value}></p-money>
            
        `;
    }
}

customElements.define('p-receipts-receipt', PReceiptsReceipt);
