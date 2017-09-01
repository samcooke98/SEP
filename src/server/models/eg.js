import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exampleSchema = new Schema( { 
    name: { type: 'String' } 
})

exampleSchema.methods.hello = () => { 
    return "Hello World - from " + (this.name || " Mr Smith");
}

export default mongoose.model('Example', exampleSchema);