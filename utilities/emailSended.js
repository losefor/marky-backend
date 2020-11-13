const nodemailer = require('nodemailer');



module.exports = async function  sendEmail(name , email , uid ) {
    const transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    });
    
     transporter.sendMail({
        from:'muhammed' , 
        to:email,
        subject:'النيجة النهائية',
        html:`
        <div>
  <h1> 
  تم الاعلان عن النتائج - الان يمكنك مشاهدة نتيجتك على الموقع 
  -${name}-
  اهلا
  </h1>
  
  <div class='btn-cont'>

    <a href="https://marky-frontend.herokuapp.com/student/score/${uid}">مشاهدة النتيجة</a>
  </div>
</div>
<style>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap");

body {
  font-family: "Tajawal", sans-serif;
}

h1 {
  text-align: center;
  padding: 10px;
}

.btn-cont {
  display: flex;
  justify-content: center;
}

a {
  background-color: gold;
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 25px;
  transition: 0.3s;
  box-shadow: 0 0 10px #ccc;
}

a:hover {
  transform: translatey(-3px);
  box-shadow: 0 0 15px gold;
}


</style>

`
    }).then(message =>{
        console.log(message)
    }).catch(err=>{console.log(err)})
    
}