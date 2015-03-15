package component

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
        presenter.init('message')

        then:
        presenter.author == ''
        presenter.title == ''
        presenter.year == ''
        1 * counter.init('message')
        1 * gQuery.bindAllProperties(presenter)
        1 * gQuery.onEvent('#addNewBook', 'click', _)
        1 * gQuery.doRemoteCall(urlBooks, 'GET', null, _, _)
        0 * _
    }

    def 'add book to server'() {
        when:
        presenter.addBookToServer()

        then:
        1 * gQuery.doRemoteCall('/addBook', 'POST',
                new Book(author: author, title: title, year: Integer.parseInt(year)), _, _)
        0 * _
    }

    @Unroll
    def 'add invalid book'() {
        when:
        presenter."$property" = value
        presenter.addBookToServer()

        then:
        0 * _

        where:
        property | value
        'author' | null
        'year'   | null
        'title'  | null
        'author' | ''
        'year'   | ''
        'title'  | ''
        'year'   | '1900'
    }

    private title = 'title'
    private author = 'author'
    private year = '2012'
    private counter = Mock(Counter)
    private gQuery = Mock(GQuery)
    private urlBooks = 'urlBooks'
    private bookListSelector = 'bookListSelector'
    private presenter = new BookPresenter(gQuery: gQuery, counter: counter,
            urlBooks: urlBooks, booksListSelector: bookListSelector,
            author: author, title: title, year: year
    )
}
