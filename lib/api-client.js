export class ApiClient {
    constructor({ url }) {
        this.url = url;
    }
    list(uid) {
        return fetch(`${this.url}/receipts/${uid}`)
            .then(r => r.json());
    }
    add(receipt, uid) {
        return fetch(`${this.url}/receipts/${uid}`, {
            method: 'POST',
            body: JSON.stringify(receipt),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        }).then(r => r.text());
    }
    remove(key, uid) {
        return fetch(`${this.url}/receipts/${uid}/${key}`, {
            method: 'DELETE',
        });
    }
    getUser(name) {
        return fetch(`${this.url}/users/${name}`)
            .then(r => r.text());
    }
    all() {
        return fetch(`${this.url}/receipts/all`)
            .then(r => r.json());
    }
}
