import { LitElement, html } from '@polymer/lit-element/lit-element.js';

function big(value) {
    return Math.floor(value).toLocaleString();
}

function small(value) {
    return Math.round((value % 1) * 100).toString().padEnd(2, '0');
}

export class PMoney extends LitElement {
    static get properties() {
        return {
            value: Number,
        };
    }
    _render({ value }) {
        return html`
            <style>
                :host {
                    display: inline-block;
                }
                .big {
                    font-size: 28px;
                }
                .pound {
                    opacity: 0.7;
                }
                .small {
                    opacity: 0.7;
                }
            </style>
            <span class="pound">£</span>
            <span class="big">${big(value)}.</span>
            <span class="small">${small(value)}</span>
        `;
    }
}

customElements.define('p-money', PMoney);
