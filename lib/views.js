export const VIEWS = Object.freeze({
    LIST: 'list',
    ADD: 'add',
    USER: 'user',
    TABLE: 'table',
});

export const VIEWS_TITLES = Object.freeze({
    [VIEWS.ADD]: 'Add a receipt',
    [VIEWS.USER]: 'User',
    [VIEWS.TABLE]: 'Diff',
});

export const VIEWS_ANIMATIONS = Object.freeze({
    [VIEWS.ADD]: {
        in: [{
            transform: ['translateY(100%) scale(0.8, 0.8)', 'translateY(0) scale(1, 1)'],
        }, {
            duration: 300,
        }],
    },
});

export function navigateTo(view) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: view }));
}
