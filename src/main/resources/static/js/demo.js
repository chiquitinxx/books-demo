requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery'
    }
});

requirejs(['jquery', 'grooscript.min', 'grooscript-tools'], function($) {
    requirejs(['app/Templates', 'app/Colorable', 'sockjs-0.3.4', 'stomp'], function() {
        var colors = Colorable();
        $('.book').each(function() {
            $( this ).removeClass('bg-white')
            $( this ).addClass('bg-'+colors.randomColor());
        });
        $(document).ready(function () {
            var socket = new SockJS('/hello');
            var stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/reload', function(msg){
                    //showGreeting(JSON.parse(greeting.body).content);
                    console.log('Msg: ' + msg);
                    location.reload();
                });
            });
            console.log("All loaded.");
        });
    });
});