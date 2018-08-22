import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import './p-receipts-list-view.js';
import './p-receipts-add-view.js';
import './p-receipts-user-view.js';
import './p-receipts-table-view.js';
import { VIEWS, VIEWS_ANIMATIONS, navigateTo } from '../lib/views.js'
import { menu, home, user as userIcon, table } from '../icons/index.js';
import { base } from '../styles/button.js';

function isHidden(expected, view, nextView) {
    return expected !== view && expected !== nextView;
}

export class PReceiptsApp extends LitElement {
    static get properties() {
        return {
            receipts: Array,
            view: String,
            nextView: String,
            barTitle: String,
            user: String,
        };
    }
    _render({ receipts, view, nextView, barTitle, user }) {
        return html`
            ${base}
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                .topbar {
                    box-sizing: border-box;
                    height: 56px;
                    background: var(--primary-color);
                    color: var(--text-color);
                    font-size: 22px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 16px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    z-index: 1;
                }
                .topbar .nav-icon {
                    width: 24px;
                    height: 24px;
                    margin-right: 32px;
                }
                .topbar .nav-icon svg {
                    width: 24px;
                    height: 24px;
                    fill: white;
                }
                .bottombar {
                    box-sizing: border-box;
                    height: 56px;
                    background: var(--primary-color);
                    color: var(--text-color);
                    font-size: 22px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    box-shadow: 0 -1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    z-index: 1;
                }
                .bottombar button {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 400;
                }
                .bottombar button svg {
                    fill: white;
                    width: 24px;
                    height: 24px;
                }
                .views {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }
                .views>* {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--background);
                    overflow-y: auto;
                }
                [hidden="true"] {
                    display: none !important
                }
            </style>
            <div class="topbar">
                <div class="nav-icon">${menu}</div>
                <span>${barTitle}</span>
            </div>
            <div class="views">
                <p-receipts-list-view  id=${VIEWS.LIST}
                                       hidden$=${isHidden(VIEWS.LIST, view, nextView)}
                                       receipts="${receipts ? receipts : []}"></p-receipts-list-view>
                <p-receipts-add-view   id=${VIEWS.ADD}
                                       hidden$=${isHidden(VIEWS.ADD, view, nextView)}></p-receipts-add-view>
                <p-receipts-user-view  id=${VIEWS.USER}
                                       hidden$=${isHidden(VIEWS.USER, view, nextView)}
                                       user=${user}></p-receipts-user-view>
                <p-receipts-table-view  id=${VIEWS.TABLE}
                                       hidden$=${isHidden(VIEWS.TABLE, view, nextView)}></p-receipts-table-view>
            </div>
            <div class="bottombar">
                <button class="btn" on-click=${() => navigateTo(VIEWS.USER)}>
                    ${userIcon}
                    <span>User</span>
                </button>
                <button class="btn" on-click=${() => navigateTo(VIEWS.LIST)}>
                    ${home}
                    Receipts
                </button>
                <button class="btn" on-click=${() => navigateTo(VIEWS.TABLE)}>
                    ${table}
                    Split
                </button>
            </div>
        `;
    }
    getViewEl(view) {
        return this.shadowRoot.querySelector(`#${view}`);
    }
    get viewEl() {
        return this.getViewEl(this.view);
    }
    get nextViewEl() {
        return this.getViewEl(this.nextView);
    }
    animateView() {
        const { viewEl, nextViewEl } = this;
        if (!viewEl) {
            if (typeof nextViewEl.enter === 'function') {
                nextViewEl.enter();
            }
            return Promise.resolve();
        }
        const viewConfig = VIEWS_ANIMATIONS[this.view];
        const nextViewConfig = VIEWS_ANIMATIONS[this.nextView];
        const outConfig = viewConfig ? viewConfig.out : null;
        const inConfig = nextViewConfig ? nextViewConfig.in : null;
        if (typeof nextViewEl.enter === 'function') {
            nextViewEl.enter();
        }
        const outAnim = viewEl.animate(
            outConfig ? outConfig[0] : { opacity: [1, 0] },
            outConfig ? outConfig[1] : { duration: 300 },
        ).finished.then(() => {
            if (typeof viewEl.leave === 'function') {
                viewEl.leave();
            }
        });
        const inAnim = nextViewEl.animate(
            inConfig ? inConfig[0] : { opacity: [0, 1] },
            inConfig ? inConfig[1] : { duration: 300 },
        );
        return Promise.all([
            outAnim,
            inAnim.finished,
        ]);
    }
}

customElements.define('p-receipts-app', PReceiptsApp);
