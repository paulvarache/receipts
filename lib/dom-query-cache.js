
const cache = new Map();

export function cachedQuerySelector(node, selector) {
    if (!cache.has(node)) {
        const map = new Map();
        cache.set(node, map);
    }
    const nodeCache = cache.get(node);
    if (!nodeCache.has(selector)) {
        const el = node.querySelector(selector);
        nodeCache.set(selector, el);
    }
    return nodeCache.get(selector);
}
