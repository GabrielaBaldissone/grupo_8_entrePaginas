const path = require("node:path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb){
        const folder = path.join(__dirname, "../public/images");
        cb(null, folder);
    },
    filename(req, file, cb){
        const fileName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const newFileName = `img-${fileName}-${Date.now()}${extension}`;
        cb(null, newFileName);
    }
});

const upload = multer({storage});

module.exports = upload;