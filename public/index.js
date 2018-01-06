
var app = new Vue({
    el: '#app',
    data: {
        video: {},
        src : '',
        pause : false,

    },
    mounted: function(){
        this.video.player=document.getElementById('video');        
    }
})
var socket=io();

function select(){
    var url=document.getElementById('url').value;
    socket.emit("url", url);
    app.video.src=url;
    app.video.url=url;
    app.video.url+=' ';
    app.src=url;
    // document.getElementById('video2').appendChild('<source src="'+url+'" type="video/mp4">');
}
var a;
function send(msg){

    if(msg === 'play'){
        a=setInterval(()=>{
            socket.emit('time',app.video.player.currentTime);
        },1000);
        app.video.player.play();
        socket.emit('command',"play");
    }
    else if(msg === 'pause'){
        app.video.player.pause();
        socket.emit('command',"pause");
    }
}
socket.on('message', function(msg){
    console.log(msg + 'yes');
});
socket.on('url',function(url){
    console.log(url);
    app.video.src=url;
    app.video.src+=' ';
    app.video.url=url;
    app.video.url+=' ';
    app.src=url;
});

socket.on('command', function(command){
    if(command === 'play'){
        app.video.player.play();
        app.pause=false;
        a=setInterval(()=>{
            socket.emit('time',app.video.player.currentTime);
        },1000);
    }
    else if(command === 'pause'){
        app.video.player.pause();
        app.pause=true;
        stopInterval(a);
    }
});

socket.on('time', function(time){
    if(app.video.player){
        if(app.video.player.currentTime > time+1 || app.pause){
            app.video.player.pause();
        } else {
            app.video.player.play();
        }
    }
})