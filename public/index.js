var vid=document.getElementById('video');
var socket=io();
var pause= false;
function select(url){
    socket.emit("url", url);
    var source=document.createElement('source');
    source.setAttribute('src', url);
    video.appendChild(source);
    // document.getElementById('video2').appendChild('<source src="'+url+'" type="video/mp4">');
}
var a;
function send(msg){
    if(msg === 'play'){
        a=setInterval(()=>{
            socket.emit('time',vid.currentTime);
        },1000);
        vid.play();
        socket.emit('command',"play");
    }
    else if(msg === 'pause'){
        vid.pause();
        socket.emit('command',"pause");
    }
}
socket.on('message', function(msg){
    console.log(msg + 'yes');
});
socket.on('url',function(url){
    console.log(url);
    document.getElementById('url').innerText=url;
    var source=document.createElement('source');
    source.setAttribute('src', url);
    video.appendChild(source);
});

socket.on('command', function(command){
    if(command === 'play'){
        vid.play();
        a=setInterval(()=>{
            socket.emit('time',vid.currentTime);
        },1000);
    }
    else if(command === 'pause'){
        vid.pause();
        pause=true;
        stopInterval(a);
    }
});

socket.on('time', function(time){
    if(vid.currentTime > time+1 || pause){
        vid.pause();
    } else {
        vid.play();
    }
})