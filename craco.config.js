const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@slices': path.resolve(__dirname, 'src/redux/slices'),
            '@store': path.resolve(__dirname, 'src/redux/store'),
        },
    },
};
