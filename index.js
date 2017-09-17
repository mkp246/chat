var express = require('express');
var app = express();
var fs = require('fs');

var privateKey  = fs.readFileSync('sslcert/key.pem');
var certificate = fs.readFileSync('sslcert/cert.pem');

var httpsServer = require('https').createServer({
		key:privateKey,
		cert: certificate
	},app);

app.use(express.static('static'));

var io = require('socket.io')(httpsServer);

io.on('connection',function(socket){
    console.log("a user connected..."+ socket.handshake.query.name);
    socket.on('message',function(data){
        console.log("Received : " + data.toString());
        io.emit('message', data);
    })
});

httpsServer.listen(8082, function(){
    console.log('listening on port 8082(https)...');
});
