import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { TYPE_LABELS } from '../lib/types.js';

function typeToLabel(type) {
    return TYPE_LABELS[type];
}

function formatValue(value) {
    return value.toFixed(2);
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
                .value {
                    font-size: 32px;
                }
            </style>
            <div>${typeToLabel(type)}</div>
            <div class="value">${formatValue(value)}</div>
            
        `;
    }
}

customElements.define('p-receipts-receipt', PReceiptsReceipt);
