const upload = require("../services/fileUpload");

const fileValidator = (req, res, next) => {
    upload.single('avatar')(req, res, function (err) {
        if (err) {
            return res.render("users/register", {
                errors: { avatar: { msg: err.message } },
                oldData: req.body,
                datos: {}
            });
        }
        next();
    });
};

module.exports = fileValidator;
