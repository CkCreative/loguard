import * as functions from 'firebase-functions';
const _ = require('lodash');
const express = require ('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const cors = require('cors');
const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);
const database = admin.database().ref().child('new');
const database2 = admin.database().ref().child('logging')
const database3 = admin.database().ref().child('tokens')
const database4 = admin.database().ref().child('exams')




const app = express();
app.use(cors());

const jsonParser = bodyParser.json()

//const urlencodedParser = bodyParser.urlencoded({ extended: false })
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
app.post('/contact', jsonParser, function(req, res){
    console.log(req.body);
    writeUserData(req.body);
    res.send(req.body.name);
    
});
app.post('/tokens', jsonParser, function(req, res){
    console.log(req.body);
    logToken(req.body);
    res.send(req.body);
    
});
app.post('/exam', jsonParser, function(req, res){
    console.log(req.body);
    logExam(req.body);
    res.send(req.body);
    
});
app.post('/isstum', jsonParser, function(req, res){
    const logged = '"'+ Math.floor(_.now()/1000) + '"';
    console.log(req.body);
    logData(req.body);
    res.send({data: req.body, logged: logged});
});
function writeUserData(contact) {
    database.push({
      contact: contact
    });
  }
function logData(logs) {
    const validation = '"'+ Math.floor(_.now()/1000) + '"';
    database2.push({
      logs: logs,
      validation: validation
    });
  }
function logToken(token) {
    const token_validation = '"'+ Math.floor(_.now()/1000) + '"';
    database3.push({
      token: token,
      token_validation: token_validation
    });
  }
function logExam(details) {
    database4.push({
      details: details,
    });
  }
  
/* nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'gator3181.hostgator.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@torantours.co.ke', // generated ethereal user
            pass: 'Smart123?' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: '"Fred Foo 👻" <info@torantours.co.ke>', // sender address
        to: 'mikeck93@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}); */
export const api = functions.https.onRequest(app);