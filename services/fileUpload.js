const path = require("node:path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb){
        const folder = path.join(__dirname, "../public/img");
        cb(null, folder);
    },
    filename(req, file, cb){
        const fileName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const newFileName = `img-${fileName}-${Date.now()}${extension}`;
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (acceptedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;