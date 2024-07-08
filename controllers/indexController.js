const path = require('path');

const indexController = {
    index: (req, res) => {
        res.render(path.resolve('views/index'))
    }
};

module.exports = indexController;