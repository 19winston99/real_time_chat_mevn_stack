import mongoose from "mongoose";

export const idValidator = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false
    }
    return true;
}