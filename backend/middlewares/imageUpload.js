import multer from 'multer';
import path from 'path';

// Configurazione di multer per l'upload di immagini
const storage = multer.diskStorage({
    destination: './public/images/users',  // Cartella di destinazione per le immagini caricate
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });