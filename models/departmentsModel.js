

const { Schema, model , Types } = require("mongoose");
const randomString = require("randomstring");

const departmentsSchema = new Schema({
 name:{type:String , required:true , unique:true},
 stages:[{name:{type:String , required:true} , value:{type:Number , require:true}}] 
});

module.exports = model("Departments", departmentsSchema);
