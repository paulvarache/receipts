import { html } from '@polymer/lit-element/lit-element.js';

export const base = html`
    <style>
        .btn {
            cursor: pointer;
            padding: 8px 16px;
            border: 0px;
            font-size: 18px;
            background: var(--button-background, transparent);
        }
    </style>
`;

export const fab = html`
    ${base}
    <style>
        .btn.fab {
            position: absolute;
            border: 0;
            padding: 0;
            right: 16px;
            bottom: 16px;
            width: 64px;
            height: 64px;
            background: var(--primary-color);
            border-radius: 50%;
            font-size: 36px;
            color: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        .btn.fab:hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
    </style>
`;
