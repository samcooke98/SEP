var nodemailer = require('nodemailer');





var transporter = nodemailer.createTransport({
  service: 'hotmail', 
  auth: {
      user: '', 
      pass: ''
  }
});


var mailOptions = {
    from: 'joseph_habib1998@hotmail.com', 
    to: '', 
    subject: 'TeamShare - Please validate your account',
    text: 'click _here_ to validate your email and get started!'
    
};

transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});