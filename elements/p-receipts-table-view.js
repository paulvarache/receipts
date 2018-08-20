import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { cachedQuerySelector } from '../lib/dom-query-cache.js';

export class PReceiptsTableView extends LitElement {
    static get properties() {
        return {
            data: Array,
            result: Array,
        };
    }
    _render({ data = [], result = [] }) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                }
                .diff, .result {
                    display: flex;
                    flex-direction: row;
                    border-bottom: 1px solid lightgrey;
                }
                .col {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border-left: 1px solid lightgrey;
                }
                .col:first-of-type {
                    border: 0;
                }
                .col p-money {
                    text-align: right;
                }
                .col>* {
                    border-bottom: 1px solid lightgrey;
                }
                .col>*:last-child {
                    border: 0;
                }
                .col .head {
                    font-size: 24px;
                    padding: 8px;
                }
                .col .cell {
                    padding: 8px;
                }
            </style>
            <div class="diff">
                ${data.map(col => html`
                    <div class="col">
                        <div class="head">${col.name}</div>
                        ${col.receipts.map(row => html`<p-money class="cell" value=${row.value}></p-money>`)}
                    </div>
                `)}
            </div>
            <div class="result">
                ${result.map(res => html`
                    <div class="col">
                        ${res < 0 ? html`<div class="cell"></div>` : html`<p-money class="cell" value=${res / 2}></p-money>`}
                    </div>
                `)}
            </div>
        `;
    }
    get inputEl() {
        return cachedQuerySelector(this.shadowRoot, '#input');
    }
    enter() {
        app.api.all()
            .then((data) => {
                this.data = data;
                const aTotal = data[0].receipts.reduce((acc, row) => acc + row.value, 0);
                const bTotal = data[1].receipts.reduce((acc, row) => acc + row.value, 0);

                this.result = [
                    bTotal - aTotal,
                    aTotal - bTotal,
                ];
            });
    }
    leave() {
        
    }
}

customElements.define('p-receipts-table-view', PReceiptsTableView);
