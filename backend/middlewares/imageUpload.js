import multer from 'multer';
import path from 'path';

// Configurazione di multer per l'upload di immagini
const storageUsersImages = multer.diskStorage({
    destination: 'C:/Users/Roberto Hasa/Desktop/Project Work/real_time_chat_mevn_stack/frontend/public/images/users',  // Cartella di destinazione per le immagini caricate
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const storageMessagesImages = multer.diskStorage({
    destination: 'C:/Users/Roberto Hasa/Desktop/Project Work/real_time_chat_mevn_stack/frontend/public/images/messages',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const uploadUsersImages = multer({ storage: storageUsersImages });
export const uploadMessagesImages = multer({storage: storageMessagesImages});