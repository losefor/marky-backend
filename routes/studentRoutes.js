const { model } = require("mongoose");
const randomString = require("randomstring");
const { auth, isAdmin } = require("../middlewares/authContoller");
const sendEmail = require('../utilities/emailSended')
const Student = model("Students");
module.exports = function studentRoutes(app) {

  // find all students
  app.get("/student", auth, isAdmin, async (req, res) => {
    const {isSuccess , name } = req.body
    const doc = await Student.find({});
    res.json(doc);
  });

  app.get("/student/alert", auth, isAdmin, async (req, res) => {
    const students = await Student.find({});
    
    students.map(student=>{
      const {name , email , uid } = student
      sendEmail(name , email , uid)
    })
    res.json({status:'success'})
  });


  // find specific student by its uid
  app.get("/student/:id", (req, res) => {
    Student.findOne({ uid: req.params.id })
      .then((doc) => res.json({
        status:'success',
        data:doc
      }))
      .catch(() => res.json({
        stauts:'fail'
      }));
  });

  // create new student
  app.post("/student", auth, isAdmin, async (req, res) => {
    const { name, department, phoneNumber, stage, email } = req.body;
    Student.create({
      department,
      name,
      phoneNumber,
      stage,
      email,
      uid: randomString.generate({
        length: 6,
        capitalization: "uppercase",
        readable: true,
      }),
    })
      .then((doc) => res.json(doc))
      .catch((err) => res.send(err));
  });

  // delete specific student by its _id
  app.delete("/student/:id", auth, isAdmin, (req, res) => {
    Student.findByIdAndRemove(req.params.id)
      .then((doc) => res.json(doc))
      .catch((err) => res.send(err));
  });

  // patch the data of a student by its own _id
  app.patch("/student/:id", auth, isAdmin, (req, res) => {
    Student.findByIdAndUpdate(req.params.id, {
      ...req.body,
    })
      .then((doc) => res.json(doc))
      .catch((err) => res.send(err));
  });
};
