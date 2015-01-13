requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery'
    }
});

requirejs(['jquery', 'grooscript.min', 'grooscript-tools'], function($) {
    requirejs(['app/Templates', 'app/Colorable', 'sockjs-0.3.4', 'stomp',
        'app/StompClient', 'app/Visible', 'app/Counter', 'app/BookPresenter'], function() {
        $(document).ready(function () {
            var counter = Counter('#counter', 'Calculating...');
            var stompClient = StompClient();
            stompClient.subscribe('/topic/reload', function() { location.reload(); });
            stompClient.subscribe('/topic/time', function(msg) { $('#actualTime').text(msg);});
            stompClient.start('/demo');
            bookPresenter = BookPresenter({
                urlBooks: '/books',
                counter: counter,
                booksListSelector: '.bookList'
            });
            bookPresenter.initBooks();
            console.log("All loaded.");
        });
    });
});