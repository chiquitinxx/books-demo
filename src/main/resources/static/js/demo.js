requirejs.config({
    baseUrl: 'js/app',
    paths: {
        lib: '../lib',
        jquery: '../lib/jquery'
    }
});

/*
requirejs(['jquery', 'lib/grooscript.min', 'lib/grooscript-tools', 'Colorable'], function($) {
    requirejs(['Templates', 'lib/sockjs-0.3.4', 'lib/stomp', 'StompClient', 'Counter', 'Chart',
        'BookPresenter', 'Book'], function() {
        $(document).ready(function () {
            var bookPresenter = BookPresenter({
                urlBooks: '/books',
                booksListSelector: '.bookList',
                counterSelector: '#counter'
            });

            var stompClient = StompClient();
            stompClient.subscribe('/topic/reload', function() { location.reload(); });
            stompClient.subscribe('/topic/time', function(msg) { $('#actualTime').text(msg.date);});
            stompClient.subscribe('/topic/newBook',
                (function(book, presenter) { presenter.newBookFromServer(book);}).rcurry(bookPresenter)
            );
            stompClient.start('/demo');

            bookPresenter.init();
        });
    });
});*/

requirejs(['jquery', 'lib/grooscript.min', 'lib/grooscript-tools'], function($) {
    requirejs(['Templates', 'lib/sockjs-0.3.4', 'lib/stomp', 'bookDemo']);
});