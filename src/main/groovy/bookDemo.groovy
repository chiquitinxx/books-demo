import component.BookPresenter
import component.StompClient
import component.view.BookView
import org.grooscript.jquery.GQueryImpl
import static org.grooscript.GrooScript.nativeJs

def gQuery = new GQueryImpl()

gQuery.onReady {

    def bookPresenter = new BookPresenter(
            urlBooks: '/books',
            booksListSelector: '.bookList',
            counterSelector: '#counter',
            pieChartSelector: '.ct-chart',
            view: new BookView(gQuery: gQuery),
            gQuery: gQuery
    )

    def stompClient = new StompClient()
    stompClient.subscribe('/topic/reload') {
        nativeJs('location.reload()')
    }
    stompClient.subscribe('/topic/time') { msg ->
        $('#actualTime').text(msg.date)
    }
    stompClient.subscribe('/topic/newBook') { book ->
        bookPresenter.newBookFromServer(book)
    }

    stompClient.start '/demo'

    bookPresenter.init()
}