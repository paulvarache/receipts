import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-receipt.js';
import './p-date.js';
import { removeReceipt } from '../lib/actions.js';

function isSameDate(a, b) {
    const aDate = new Date(a);
    const bDate = new Date(b);

    return aDate.getDate() === bDate.getDate()
        && aDate.getMonth() === bDate.getMonth()
        && aDate.getFullYear() === bDate.getFullYear();
}

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
                hr {
                    background-color: #eee;
                    border: 0 none;
                    color: #eee;
                    height: 1px;
                }
            </style>
            <div class="list">
                ${receipts.map(({ id, value, type, timestamp, label }, index) => {
                    const displayDate = receipts[index - 1] ? !isSameDate(receipts[index - 1].timestamp, timestamp) : false;
                    return html`
                        ${!index || displayDate ? html`<p-date value=${timestamp}></p-date>` : ''}
                        ${index && !displayDate  ? html`<hr/>` : ''}
                        <p-receipts-receipt value=${value}
                                            type=${type}
                                            label=${label}
                                            on-remove=${() => this._removeReceipt(id)}></p-receipts-receipt>
                    `;
                })}
            </div>
        `;
    }
    _removeReceipt(key) {
        removeReceipt(key);
    }
}

customElements.define('p-receipts-list', PReceiptsList);
