var handler = function(){
    var hue = '000000'+Math.floor(Math.random()*16777215).toString(16);
    $("#color").val('#'+hue.substr(-6));
    $('#connect').on("click",function(){
        if($('#name').val()){
            window.socket = io.connect({
                secure: true,
				transports:  ["xhr-polling","websocket","polling", "htmlfile"],
				query: {
                    name : $('#name').val(),
                    color : $('#color').val()
                }
              });
            $('#connect').prop('disabled', true);
            window.socket.on("message", function(data){
                console.log(data);
                var elem = "<li style=background-color:"+data.color+"><p>"+data.name+"</p><p>"+data.message+"</p></li>"
                $('#chat').append(elem);
				notif.play();
            });
        }else{
            alert("please choose a name...");
        }
    });
    $('#message').keypress(function(e){
        if(e.which == 13)$('#send').click();
    });
    $('#send').on("click", function(){
        if($('#message').val()){
            window.socket.emit('message',{
                name :$('#name').val(),
                color : $('#color').val(),
                message : $('#message').val()
            });
            $('#message').val(""); 
        }
    });
    
};

$('document').ready(handler);
var notif = new Audio("https://raw.githubusercontent.com/IonDen/ion.sound/master/sounds/tap.mp3");