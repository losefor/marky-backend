const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");

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

const userSchema = new Schema({
  name: { type: String, required: [true, "Blease provied a name"] },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (el) {
        console.log(el, this.password);
        return el === this.password;
      },
      message: "the passwords that provided do not match",
    },
  },
  phoneNumber: { type: String, required: true },
  stage: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6] },
  department: { type: String, required: true, enum: departments },
  isAdmin: { type: Boolean, default: false },
  isMainAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (canidatePassword) {
  return await bcrypt.compare(canidatePassword, this.password);
};

module.exports = model("Users", userSchema);
