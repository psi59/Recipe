///////////////////////////////////////////
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

	
	///////////////////////////////////////////

/* GET/POST 파라미터 처리 => body-parser 모듈 사용! */
var mysql = require('mysql');
var dateFormat = require('dateformat');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
 
//express 모듈에 보조 장치 장착한다.
app.use(bodyParser.json()); // JSON 형식으로 넘오온 데이터 처리 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('www'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





	app.get('/', function (request, response) {
		response.send('Express 적용 예제');
	});


app.get('/user/authentication.do', function (request, response) {
	var inputEmail = request.query.email;
	var authKEY = request.query.authKEY;
	var auth=1;
	
	var mailOptions = {
			  from: "somangily@gmail.com",
			  to: inputEmail,
			  subject: "href",
			  generateTextFromHTML: true,
			  html: "<a href='http://127.0.0.1:8080/user/auth.json?authKEY="+authKEY+"&auth="+auth+"&inputEmail="+inputEmail+"'>"+inputEmail+"</a>"
			};
	
	smtpTransport.sendMail(mailOptions, function(error, response) {
		  if (error) {
		    console.log(error);
		  } else {
		    console.log(response);
		  }
		  smtpTransport.close();
		});
	
	response.end();
});



app.listen(8888, function () {
	console.log('Example app listening on port 8888!');
});