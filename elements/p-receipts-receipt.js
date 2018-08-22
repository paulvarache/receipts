import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { subscribeDOM } from '@kano/common/index.js';
import { RECEIPT_LABELS, RECEIPT_ICONS } from '../lib/types.js';

import './p-money.js';

export class PReceiptsReceipt extends LitElement {
    static get properties() {
        return {
            type: Number,
            value: Number,
            label: String,
        };
    }
    _render({ type, value, label }) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: row;
                    padding: 16px 16px;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0, 0, 0, 0);
                }
                :host(.touching) {
                    transition: background linear 600ms;
                    background: rgba(0, 0, 0, 0.1);
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
            <div class="label">${label || RECEIPT_LABELS[type]}</div>
            <p-money value=${value}></p-money>
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this._contextSub = subscribeDOM(this, 'contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.touching = false;
            const confirmed = confirm(`Are you sure you want to delete this receipt?`);
            if (confirmed) {
                this.dispatchEvent(new CustomEvent('remove'));
            }
        });
        this._touchSub = subscribeDOM(this, 'touchstart', () => {
            if (this._touching) {
                return;
            }
            this.touching = true;
        });
        this._touchendSub = subscribeDOM(this, 'touchend', () => {
            this.touching = false;
        });
    }
    set touching(v) {
        this._touching = v;
        if (this._touching) {
            this.classList.add('touching');
        } else {
            this.classList.remove('touching');
        }
    }
    get touching() {
        return this._touching;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._contextSub.dispose();
        this._touchSub.dispose();
        this._touchendSub.dispose();
    }
}

customElements.define('p-receipts-receipt', PReceiptsReceipt);
