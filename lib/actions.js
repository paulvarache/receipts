
export function addReceipt(type, value, timestamp) {
    return app.api.add({ type, value, timestamp }, app.root.user.id)
        .then(() => {
            window.dispatchEvent(new CustomEvent('add-receipt', { detail: { type, value } }));
        });
}

export function updateUser(user) {
    app.setUser(user);
}