import './elements/p-receipts-app.js';
import { RECEIPT_TYPES } from './lib/types.js';

const app = document.querySelector('p-receipts-app');

app.receipts = [{
    type: RECEIPT_TYPES.FOOD,
    value: 46.5,
}, {
    type: RECEIPT_TYPES.FOOD,
    value: 7.43,
}];
