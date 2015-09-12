package component

import component.view.BookView
import demo.model.Book
import org.grooscript.jquery.GQuery
import spock.lang.Specification
import spock.lang.Unroll

/**
 * Created by jorge on 15/3/15.
 */
class BookPresenterSpec extends Specification {

    def 'init book presenter'() {
        when:
        presenter.init()

        then:
        1 * view.startCounter(counterSelector, _)
        1 * view.bindBookPropertiesTo(presenter)
        1 * view.onAddNewBook(_)
        1 * view.onClearNewBook(_)
        1 * view.onConsole(salute)
        1 * gQuery.doRemoteCall(urlBooks, 'GET', null, _, _)
        presenter.author == ''
        presenter.title == ''
        presenter.year == ''
    }

    def 'on receive books'() {
        given:
        def books = [new Book(year: 2011), new Book(year: 2015), new Book(year: 2012), new Book(year: 2015)]

        when:
        presenter.onReceiveBooks(books)

        then:
        1 * view.updateBooksNumber(books.size())
        1 * view.pieChart(pieChartSelector, [labels: [2015, 2012, 2011], series: [2, 1, 1]])
        presenter.books == books

    }

    def 'add book to server'() {
        when:
        presenter.addBookToServer()

        then:
        1 * gQuery.doRemoteCall('/addBook', 'POST', book, _, _)
        0 * _
    }

    @Unroll
    def 'not sending book to server if book is invalid'() {
        when:
        presenter."$property" = value
        presenter.addBookToServer()

        then:
        1 * view.errorMessage('No!', errorMessage)

        where:
        property | value    | errorMessage
        'author' | null     | 'Author missing'
        'year'   | null     | 'Missing year'
        'title'  | null     | 'Forgot title'
        'author' | ''       | 'Author missing'
        'year'   | ''       | 'Missing year'
        'title'  | ''       | 'Forgot title'
        'year'   | '1900'   | 'At least XX century'
    }

    def setup() {
        0 * _
    }

    private title = 'title'
    private author = 'author'
    private year = '2012'
    private book = new Book(author: author, title: title, year: Integer.parseInt(year))
    private gQuery = Mock(GQuery)
    private urlBooks = 'urlBooks'
    private counterSelector = 'counterSelector'
    private bookListSelector = 'bookListSelector'
    private pieChartSelector = 'pieChartSelector'
    private salute = 'hello world'
    private view = Mock(BookView)
    private messages = [
        salute: salute
    ]
    private presenter = new BookPresenter(gQuery: gQuery, view: view, counterSelector: counterSelector,
            urlBooks: urlBooks, booksListSelector: bookListSelector, author: author, title: title, year: year,
            messages: messages, pieChartSelector: pieChartSelector
    )
}
