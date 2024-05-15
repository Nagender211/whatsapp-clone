import mongoose from "mongoose";

const whatsAppSchema= mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    recived: Boolean,
    

});

const WhatsAppMessage = mongoose.model("whatsappmessages", whatsAppSchema);

export default WhatsAppMessage;
