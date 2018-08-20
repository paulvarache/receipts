import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'index.js',
    output: {
      file: 'public/index.js',
      format: 'iife',
      name: 'Receipts',
    },
    plugins: [
        resolve(),
    ],
};