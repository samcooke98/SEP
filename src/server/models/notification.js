import mongoose from "mongoose"; //Only imports the Schema and Model functions from mongoose 
const { ObjectId } = mongoose.Schema

const Notification = new mongoose.Schema({
    url: { type: String, required: true }, //Where should clicking on the notification take you? 
    triggerPerson: { type: ObjectId, ref: "Account", required: true },  //Who caused the Notification? 
    team: { type: ObjectId, ref: "Team", required: false }, //What team did this notification take place in? 
    time: { type: Date, default: Date.now }, //When was the notification created? 
    // user: { type: ObjectId, ref: "User", required: false }, //Who is the notification for? 
    description: { type: String, required: true }, //What is the body of the notification? 
    // hasRead: { required:false, type: Boolean, default: false }
})

export default mongoose.model("Notification", Notification);