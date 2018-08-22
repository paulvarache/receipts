import * as icons from '../icons/receipts.js';

export const RECEIPT_TYPES = {
    FOOD: 0,
    EATING_OUT: 1,
    SHOPPING: 2,
    ENTERTAINMENT: 3,
    PERSONAL_CARE: 4,
    TRANSPORT: 5,
    BILLS: 6,
    GENERAL: 7,
    HOLIDAYS: 8,
};

export const RECEIPT_LABELS = {
    [RECEIPT_TYPES.FOOD]: 'Groceries',
    [RECEIPT_TYPES.EATING_OUT]: 'Eating Out',
    [RECEIPT_TYPES.SHOPPING]: 'Shopping',
    [RECEIPT_TYPES.ENTERTAINMENT]: 'Entertainment',
    [RECEIPT_TYPES.PERSONAL_CARE]: 'Personal Care',
    [RECEIPT_TYPES.TRANSPORT]: 'Transport',
    [RECEIPT_TYPES.BILLS]: 'Bills',
    [RECEIPT_TYPES.GENERAL]: 'General',
    [RECEIPT_TYPES.HOLIDAYS]: 'Holidays',
};

export const RECEIPT_ICONS = {
    [RECEIPT_TYPES.FOOD]: icons.food,
    [RECEIPT_TYPES.EATING_OUT]: icons.eatingOut,
    [RECEIPT_TYPES.SHOPPING]: icons.shopping,
    [RECEIPT_TYPES.ENTERTAINMENT]: icons.entertainment,
    [RECEIPT_TYPES.PERSONAL_CARE]: icons.personalCare,
    [RECEIPT_TYPES.TRANSPORT]: icons.transport,
    [RECEIPT_TYPES.BILLS]: icons.bills,
    [RECEIPT_TYPES.GENERAL]: icons.general,
    [RECEIPT_TYPES.HOLIDAYS]: icons.holidays,
};