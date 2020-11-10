const { Schema, model , Types } = require("mongoose");

const studentsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: String, required: true },
  stage: { type: Number, required: true },
  department: { type: Types.ObjectId, required: true, ref: "Departments" },
  isSuccess: { type: Boolean, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Students", studentsSchema);
