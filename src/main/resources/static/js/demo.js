requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery'
    }
});

requirejs(['jquery', 'grooscript.min', 'grooscript-tools', 'app/Colorable'], function($) {
    requirejs(['app/Templates', 'sockjs-0.3.4', 'stomp', 'app/StompClient', 'app/Visible', 'app/Counter', 'app/Chart',
        'app/BookPresenter', 'app/Book'], function() {
        $(document).ready(function () {
            var stompClient = StompClient();
            stompClient.subscribe('/topic/reload', function() { location.reload(); });
            stompClient.subscribe('/topic/time', function(msg) { $('#actualTime').text(msg.date);});
            stompClient.subscribe('/topic/newBook', function(book) { bookPresenter.newBookFromServer(book);});
            stompClient.start('/demo');
            var counter = Counter();
            counter.start('#counter');
            bookPresenter = BookPresenter({
                urlBooks: '/books',
                counter: counter,
                booksListSelector: '.bookList'
            });
            bookPresenter.init();
        });
    });
});