var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('static'));

io.on('connection',function(socket){
    console.log("a user connected..."+ socket.handshake.query.name);
    socket.on('message',function(data){
        console.log("Received : " + data.toString());
        io.emit('message', data);
    })
});

server.listen(8081, function(){
    console.log('listening on port 8081...');
});
