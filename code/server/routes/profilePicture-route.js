const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../../model/user-model');
console.log("storage er baire");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("storage e");
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    console.log("file filter e dhukse");
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/').post(upload.single('imageURL'), (req, res) => {
    const imageURL = req.file.filename;

    const newUserData = {
        imageURL
    }

    const newUser = new User(newUserData);

    newUser.save()
           .then(() => res.status(200).json('Picture Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;