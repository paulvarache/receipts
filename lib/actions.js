
export function addReceipt(type, value, timestamp, label) {
    return app.api.add({ type, value, timestamp, label }, app.root.user.id)
        .then((id) => {
            window.dispatchEvent(new CustomEvent('add-receipt', { detail: { id, type, value, timestamp, label } }));
        });
}
export function removeReceipt(key) {
    return app.api.remove(key, app.root.user.id)
        .then(() => {
            window.dispatchEvent(new CustomEvent('remove-receipt', { detail: key }));
        });
}

export function updateUser(user) {
    app.setUser(user);
}