import './elements/p-receipts-app.js';
import { RECEIPT_TYPES } from './lib/types.js';
import { VIEWS, VIEWS_TITLES } from './lib/views.js';
import { ApiClient } from './lib/api-client.js';

const nativeAnimate = HTMLElement.prototype.animate;

HTMLElement.prototype.animate = function animate(...args) {
    const animation = nativeAnimate.call(this, ...args);
    animation.finished = new Promise(resolve => animation.onfinish = resolve);
    return animation;
};

const API_URL = 'https://us-central1-p-receipts.cloudfunctions.net';

class App {
    constructor() {
        this.api = new ApiClient({
            url: API_URL,
        });
        this.root = document.querySelector('p-receipts-app');
    }
    boot() {
        this.load();
        if (!this.root.user) {
            this.navigate(VIEWS.USER);
        } else {
            this.navigate(VIEWS.LIST);
        }
        window.addEventListener('navigate', (e) => this.navigate(e.detail));
        window.addEventListener('add-receipt', (e) => this.addReceipt(e.detail));
        window.addEventListener('remove-receipt', (e) => this.removeReceipt(e.detail));
    }
    updateList() {
        this.api.list(this.root.user.id)
            .then(receipts => this.root.receipts = receipts);
    }
    navigate(view) {
        this.root.nextView = view;
        this.root.animateView()
            .then(() => {
                this.root.view = view;
                this.root.nextView = null;
                this.root.barTitle = VIEWS_TITLES[view] || 'Receipts (beta)';
            });
    }
    addReceipt(data) {
        this.root.receipts.unshift(data);
        this.root.receipts = this.root.receipts.slice(0);
    }
    removeReceipt(id) {
        const index = this.root.receipts.findIndex(r => r.id === id);
        this.root.receipts.splice(index, 1);
        this.root.receipts = this.root.receipts.slice(0);
    }
    setUser(user, save = true) {
        this.root.user = user;
        this.updateList();
        if (save) {
            this.save();
        }
    }
    save() {
        const { user } = this.root;
        if (!user) {
            return;
        }
        localStorage.setItem('user', JSON.stringify(user));
    }
    load() {
        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }
        this.setUser(JSON.parse(user), false);
    }
}

const app = new App();

app.boot();


window.app = app;