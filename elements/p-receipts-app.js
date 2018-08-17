import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-list-view.js';

export class PReceiptsApp extends LitElement {
    static get properties() {
        return {
            receipts: Array,
        };
    }
    _render({ receipts }) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                .topbar {
                    height: 64px;
                    background: var(--primary-color);
                }
                .views {
                    flex: 1;
                }
                .views>* {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="topbar"></div>
            <div class="views">
                <p-receipts-list-view receipts="${receipts ? receipts : []}"></p-receipts-list-view>
            </div>
        `;
    }
}

customElements.define('p-receipts-app', PReceiptsApp);
