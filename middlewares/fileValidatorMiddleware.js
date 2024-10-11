const upload = require("../services/fileUpload");

const fileValidator = (fieldName, renderPath) => (req, res, next) => {
    upload.single(fieldName)(req, res, function (err) {
        if (err) {
            return res.render(renderPath, {
                errors: { [fieldName]: { msg: err.message } },
                oldData: req.body,
                datos: {}
            });
        }
        next();
    });
};

module.exports = fileValidator;
