const multer  = require('multer');
var path = require('path');

//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 



  // SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })

const fileFilter = (req, file, cb) => {
// image/jpeg
// image/png
// audio/mpeg
// audio/ogg
// audio/*
// video/mp4
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'audio/mpeg' || file.mimetype == 'audio/ogg' || file.mimetype == 'audio/*' || file.mimetype == 'video/mp4' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
   
var upload = multer({fileFilter, storage: storage })

module.exports = {
      upload,
}