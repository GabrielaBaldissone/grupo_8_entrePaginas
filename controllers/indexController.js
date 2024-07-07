const path = require('path');

const indexController = {
    index: (req, res) => {
        res.sendFile(path.resolve('views/index.html'))
    }
};

module.exports = indexController;