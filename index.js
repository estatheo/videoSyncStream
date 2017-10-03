var app=require('express')();
var http= require('http').Server(app);
var io= require('socket.io')(http);
var port = process.env.PORT || 3000

app.get('/', function(req,res){
    res.sendFile(__dirname+ '/index.html');
});

io.on('connection', function(socket){
    socket.on('click', function(msg){
        console.log('click');
        io.emit('ping', {for: 'everyone'});
    });
    socket.on('url', function(url){
        socket.broadcast.emit('url', url);
    })
    
    socket.on('command', function(command){
        socket.broadcast.emit('command', command);
    })
  });
app.listen(process.env.port, function(){
    
});

