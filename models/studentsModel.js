const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const departments = [
  "computerScince",
  "computerEngineerign",
  "architecturalEngineering",
  "civilEngineering",
  "communicationEngineering",
  "electricalEngineering",
  "managementAndEconomy",
  "politicalScience",
];

const studentsSchema = new Schema({
  name: { type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.default.isEmail, "NOT_VALID_EMAIL"],
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: String, required: true },
  stage: { type: Number, required: true },
  department: { type: String, required: true, enum: departments },
  isSuccess: { type: Boolean, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Students", studentsSchema);
