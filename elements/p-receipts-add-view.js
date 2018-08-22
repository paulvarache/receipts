import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { navigateTo, VIEWS } from '../lib/views.js';
import { base } from '../styles/button.js';
import { addReceipt } from '../lib/actions.js';
import { RECEIPT_TYPES, RECEIPT_LABELS } from '../lib/types.js';
import { cachedQuerySelector } from '../lib/dom-query-cache.js';
import { wait } from '../lib/time.js';
import { tick } from '../icons/index.js';

export class PReceiptsAddView extends LitElement {
    _render() {
        return html`
            ${base}
            <style>
                :host, form {
                    display: flex;
                    flex-direction: column;
                    background: var(--primary-color);
                }
                input {
                    font-size: 28px;
                    border: 0px;
                    text-align: center;
                    min-width: 92px;
                    height: 38px;
                    border: 2px solid var(--primary-color);
                    border-radius: 8px;
                    outline: none;
                }
                input[type="number"] {
                    width: 92px;
                }
                #label, #input {
                    font-weight: 100;
                    font-family: Roboto;
                    font-size: 14px;
                }
                input[type=date]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    display: none;
                }
                input[type=date]::-webkit-calendar-picker-indicator {
                    -webkit-appearance: none;
                    display: none;
                }
                select, input[type="date"] {
                    -webkit-appearance: none;
                    text-indent: 1px;
                    text-overflow: '';
                    background: transparent;
                    border: 0;
                    color: white;
                    font-size: 22px;
                    font-weight: 100;
                    font-family: Roboto;
                }
                .actions {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-self: stretch;
                }
                .actions .btn {
                    color: white;
                }
                form {
                    flex: 1;
                    justify-content: space-between;
                    align-items: center;
                }
                .success {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: none;
                    background: white;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 42px;
                }
                .tick svg {
                    width: 64px;
                    height: 64px;
                }
                .date-inputs {
                    display: flex;
                    flex-direction: row;
                }
                .date-inputs>* {
                    font-size: 16px;
                    background: white;
                }
                .date-inputs>*:first-child {
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;
                    border-right: 0px;
                }
                .date-inputs>*:last-child {
                    border-top-left-radius: 0px;
                    border-bottom-left-radius: 0px;
                }
            </style>
            <form on-submit=${(e) => this._submit(e)}>
                <div class="actions">
                    <button class="btn" type="button" on-click=${() => this._cancel()}>Cancel</button>
                    <button class="btn">Save</button>
                </div>
                <select id="type" value$=${RECEIPT_TYPES.FOOD}>
                    ${Object.keys(RECEIPT_TYPES).map(type => html`
                        <option value$=${RECEIPT_TYPES[type]}>${RECEIPT_LABELS[RECEIPT_TYPES[type]]}</option>
                    `)}
                </select>
                <div class="date-inputs">
                    <input id="date" type="date" />
                </div>
                <input id="label" type="text" placeholder="Message" />
                <input id="input" type="number" step="0.01" placeholder="Amount" autofocus />
                <div></div>
            </form>
            <div class="success">
                <div class="tick">${tick}</div>
                <span>Added</span>
            </div>
        `;
    }
    get labelEl() {
        return cachedQuerySelector(this.shadowRoot, '#label');
    }
    get typeEl() {
        return cachedQuerySelector(this.shadowRoot, '#type');
    }
    get dateEl() {
        return cachedQuerySelector(this.shadowRoot, '#date');
    }
    get inputEl() {
        return cachedQuerySelector(this.shadowRoot, '#input');
    }
    get formEl() {
        return cachedQuerySelector(this.shadowRoot, 'form');
    }
    get successEl() {
        return cachedQuerySelector(this.shadowRoot, '.success');
    }
    get tickEl() {
        return cachedQuerySelector(this.shadowRoot, '.tick');
    }
    get successMessageEl() {
        return cachedQuerySelector(this.shadowRoot, '.success>span');
    }
    _submit(e) {
        e.preventDefault();
        const date = new Date(this.dateEl.valueAsNumber);
        const type = parseInt(this.typeEl.value, 10);
        const label = this.labelEl.value;
        addReceipt(type, parseFloat(this.inputEl.value), date, label)
            .then(() => {
                this.successEl.style.display = 'flex';
                const tickAnim = this.tickEl.animate({
                    opacity: [0, 1],
                    transform: ['scale(0, 0)', 'scale(1, 1)']
                }, {
                    duration: 300,
                });
                const messageAnim = this.successMessageEl.animate({
                    opacity: [0, 1],
                    transform: ['scale(0, 0)', 'scale(1, 1)'],
                }, {
                    duration: 300,
                    delay: 200,
                    fill: 'backwards',
                });
                return Promise.all([
                    tickAnim.finished,
                    messageAnim.finished,
                ]);
            })
            .then(() => wait(500))
            .then(() => {
                navigateTo(VIEWS.LIST);
            });
    }
    _cancel() {
        navigateTo(VIEWS.LIST);
    }
    reset() {
        this.formEl.reset();
        const coeff = 1000 * 60;
        const now = new Date();
        const roundNow = new Date(Math.round(now.getTime() / coeff) * coeff)
        this.dateEl.valueAsDate = roundNow;
        this.successEl.style.display = 'none';
    }
    enter() {
        this.reset();
        this.inputEl.focus();
    }
}

customElements.define('p-receipts-add-view', PReceiptsAddView);
