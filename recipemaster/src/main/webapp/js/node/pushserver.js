var express = require('express');
var routes = require('routes');
var http = require('http');
var path = require('path');
 
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
 
var httpServer =http.createServer(app).listen(8081, function(req,res){
  console.log('Socket IO server has been started');
});
// upgrade http server to socket.io server
var io = require('socket.io').listen(httpServer);
var clients = [];

io.sockets.on('connection',function(socket){   
	socket.on('login', function(data) {
        var clientInfo = new Object();
        clientInfo.uid = data.uid;
        clientInfo.id = socket.id;
        clients.push(clientInfo);
        console.log('Message from client :'+data.uid + 'socket id' + socket.id);
    });
   
   
   socket.on('message',function(data){
	   for (var i=0; i < clients.length; i++) {
	        var client = clients[i];
	        console.log('client.uid = '+ client.uid);
	        console.log('data.uid = '+ data.uid);
	        if (client.uid == data.uid) {
               socket.to(client.id).send(data.msg);
            }
        }
//       socket.socket(client.id).emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
       console.log('asdasd :'+data.msg);
       console.log('asdasd :'+data.uid);
   });
});
