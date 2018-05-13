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

var port = process.env.PORT || 8082;
io.on('connection',function(socket){
    console.log("a user connected..."+ socket.handshake.query.name);
    socket.on('message',function(data){
        io.emit('message', data);
    })
});

httpsServer.listen(port, function(){
    console.log('listening on port '+ port + '(https)...');
});
