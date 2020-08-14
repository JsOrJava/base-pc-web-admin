module.exports = {
    compact: false,
    presets: ['@vue/app', {}],
    env: {
        development: {
            plugins: ['dynamic-import-node']
        }
    }
}
