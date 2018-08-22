import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-list.js';
import { VIEWS, navigateTo } from '../lib/views.js';
import { fab } from '../styles/button.js';

export class PReceiptsListView extends LitElement {
    static get properties() {
        return {
            receipts: Array,
        };
    }
    _render({ receipts }) {
        return html`
            ${fab}
            <style>
                :host {
                    display: block;
                    position: relative;
                }
                p-receipts-list {
                    overflow-y: auto;
                }
                .fab-container {
                    pointer-events: none;
                }
                .btn.fab {
                    pointer-events: all;
                }
                .fab-container, .empty {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .empty {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: lightgrey;
                    font-size: 14px;
                }
                [hidden="true"] {
                    display: none !important
                }
            </style>
            <p-receipts-list receipts="${receipts}"></p-receipts-list>
            <div class="empty" hidden$=${!!receipts.length}>
                <span>No receipts yet.</span>
            </div>
            <div class="fab-container">
                <button class="btn fab" on-click=${() => navigateTo(VIEWS.ADD)}>+</button>
            </div>
        `;
    }
}

customElements.define('p-receipts-list-view', PReceiptsListView);
