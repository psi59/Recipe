var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "somangily@gmail.com", 
      
      clientId: "854303379765-qfo2qv1jb1me218j4j6ht6321siq5hrp.apps.googleusercontent.com",
      clientSecret: "6G1aI3dxZIgOVHcwb90mciqt",
      refreshToken: "1/H25r6ikpWsThkpi0S60c40hQ-iEYWZF7b8IFneady8U"
    }
  }
});

var mailOptions = {
  from: "somangily@gmail.com",
  to: "ask_bigbang@naver.com",
  subject: "href",
  generateTextFromHTML: true,
  html: "<b>Hello world</b>",
  html: "<a href='http://127.0.0.1:8080/'>Hello world</a>"
};

smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
  smtpTransport.close();
});
