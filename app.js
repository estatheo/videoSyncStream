
var express= require('express')
var path = require('path')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port =  3000


app.use(express.static(path.join(__dirname+'/public')));
app.get('/', function( req, res) {
res.sendFile(__dirname+ '/index.html');
});

var urlMain="";
io.on('connection', function(socket){
    socket.broadcast.emit('url',urlMain);
    socket.broadcast.emit('message', "hello");
    console.log(urlMain);
    console.log('new user');
    socket.on('click', function(msg){
        console.log('click');
        io.emit('ping', {for: 'everyone'});
    });
    socket.on('url', function(url){
        urlMain=url;
        socket.broadcast.emit('url', url);
    });
    
    socket.on('command', function(command){
        socket.broadcast.emit('command', command);
    });

    socket.on('time', function(time){
        socket.broadcast.emit('time',time);
    })
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });
http.listen(port, function(){
    console.log("I'm here");
    console.log(__dirname);
});

