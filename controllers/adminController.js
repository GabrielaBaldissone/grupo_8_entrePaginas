const path = require("path");

const adminController = {
    getAdmin(req, res){
        res.sendFile(path.resolve("views/formAdminProduct.html"));
    }
}

module.exports = adminController;