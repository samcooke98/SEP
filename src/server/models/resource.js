import mongoose from "mongoose"; //Only imports the Schema and Model functions from mongoose 

let Resource = new mongoose.Schema({
	url: { type: String, required: true },
	creationTime: { type: Date, default: Date.now },
	description: { type: String },
	title: { type: String },
	owner: { type: mongoose.Schema.ObjectId, required: true, ref: "Account" },
	team: { type: mongoose.Schema.ObjectId, required: true, ref: "Team" },
	tags: [{
		type: String, required: false
	}],
	comments: [{type: mongoose.Schema.ObjectId, required: true, ref:'Comment' }],
	imgURL: {type: String, required: false}
})

export default mongoose.model("Resource", Resource);