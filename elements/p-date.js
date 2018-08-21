import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { dateSuffix, MONTHS, DAYS } from '../lib/util/dates.js';

export class PDate extends LitElement {
    static get properties() {
        return {
            value: Date,
        };
    }
    _render({ value }) {
        const date = new Date(value);
        return html`
            <style>
                :host {
                    display: inline-block;
                    opacity: 0.7;
                    padding: 24px 0px 8px 16px;
                }
            </style>
            ${DAYS[date.getDay()]} ${date.getDate()}${dateSuffix(date.getDate())} ${MONTHS[date.getMonth()]}
        `;
    }
}

customElements.define('p-date', PDate);
