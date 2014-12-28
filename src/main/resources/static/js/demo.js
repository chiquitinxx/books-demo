requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery'
    }
});

requirejs(['jquery', 'grooscript.min', 'grooscript-tools'], function($) {
    requirejs(['app/Templates', 'app/Colorable', 'sockjs-0.3.4', 'stomp',
        'app/StompClient', 'app/Visible', 'app/Counter'], function() {
        var colors = Colorable();
        $(document).ready(function () {
            var stompClient = StompClient();
            var counter = Counter('.counter');
            stompClient.subscribe('/topic/reload', function() { location.reload(); });
            stompClient.subscribe('/topic/time', function(msg) { $('#actualTime').text(msg); });
            stompClient.start('/demo');
            console.log("All loaded.");
        });
    });
});