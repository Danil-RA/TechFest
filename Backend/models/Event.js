const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {type:String, required:true},
    category: {type:String, required:true},
    fee: {type:Number, required:true, min:0},
    seats: {type: Number, required:true, min:0},
    date: {type: Date, required:true}

})

const Event = mongoose.model("Event",eventSchema);

module.exports = Event;