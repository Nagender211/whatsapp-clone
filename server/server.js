import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import WhatsAppMessage from "./models/message.js";
import dbConnection from "./dbConnection.js";
import Pusher from "pusher";
import cors from "cors"

dotenv.config();
const app = express();
dbConnection;

app.use(express.json());
app.use(cors())
const db = mongoose.connection;
db.once("open", () => {
    console.log("connected to database")
    const msgCollection = db.collection("whatsappmessages")
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
        console.log("change occered",change)
        if(change.operationType="insert"){
            const saveMessage=change.fullDocument;
            pusher.trigger("messages","inserted",{
                
                name:saveMessage.name,
                message:saveMessage.message,
                timeStamp:saveMessage.timeStamp,
               
            });

        }
        else{
            console.log("Error triggering pusher")
        }
    })
})


app.get("/", (req, res) => {
    res.send("Server is running");
});
const pusher = new Pusher({
    appId: "1802671",
    key: "e516bb62351044936d76",
    secret: "82d8e2eb416d3b6bdfcc",
    cluster: "ap2",
    useTLS: true
  });

app.get("/message/sync", async (req, res) => {
    try {
        const messages = await WhatsAppMessage.find();
        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal error");
    }
});

app.post("/message/new", async (req, res) => {
    try {
        const dbMessage = req.body;
        const message = await WhatsAppMessage.create(dbMessage);
        res.status(201).send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal error");
    }
});

app.listen(3004, () => {
    console.log("Server is running on port 3004");
});
