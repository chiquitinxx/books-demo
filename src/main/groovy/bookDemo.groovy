import component.BookPresenter
import component.StompClient
import org.grooscript.jquery.GQueryImpl

new GQueryImpl().onReady {

    def bookPresenter = new BookPresenter(
        urlBooks: '/books',
        booksListSelector: '.bookList',
        counterSelector: '#counter'
    )

    def stompClient = new StompClient()
    stompClient.subscribe('/topic/reload') {
        location.reload()
    }
    stompClient.subscribe('/topic/time') { msg ->
        $('#actualTime').text(msg.date)
    }
    stompClient.subscribe('/topic/newBook',
            { book ->
                bookPresenter.newBookFromServer(book)
            }
        /*{ book, presenter ->
            presenter.newBookFromServer(book)
        }.rcurry(bookPresenter)*/
    )
    stompClient.start '/demo'

    bookPresenter.init()
}