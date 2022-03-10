const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
var cors = require('cors')
const nodemailer = require("nodemailer");
const { response } = require('express')


app.use(cors(["localhost:5001", "localhost:3001"]))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'frontend/build')))

app.get('/api/v1/email', (req, res) => {

  console.log('abcd connecteded')

  // let testAccount = nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    service: 'Gmail',
    auth: {
      user: 'tariqayyan500@gmail.com', // generated ethereal user
      pass: 'incorrect123@', // generated ethereal password
    },
  });

  // let info =  transporter.sendMail({
  //   from: "codebreaker32@outlook.com", // sender address
  //   to: "binarybeast756@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  // });

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  let options = {
    from: "online_thrift123@outlook.com", // sender address
    to: "binarybeast756@gmail.com", // list of receivers
    subject: "Hello ✔ ", // Subject line
    text: "Hello world Testing send email from node js ", // plain text body
};

  transporter.sendMail(options, function (err,info) {
    if(err){
      console.log(err);
      return
    }
    console.log(info,response)
    // response.send('email sent')
  
  })
})

app.get("/**", (req, res, next) => {
     res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
    // res.redirect("/")
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})