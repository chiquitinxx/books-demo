package component

import demo.model.Book
import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryList
import org.grooscript.templates.Templates
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
        presenter.author == ''
        presenter.title == ''
        presenter.year == ''
        1 * gQuery.bindAllProperties(presenter)
        1 * gQuery.onEvent('#addNewBook', 'click', _)
        1 * gQuery.doRemoteCall(urlBooks, 'GET', null, _, _)
        0 * _
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

    void 'get new book from server'() {
        given:
        def lastBookHtml = 'lastBookHtml'
        Templates.templates = ['lastBook.gtpl': { it -> assert book == it.last; return lastBookHtml}]

        when:
        presenter.newBookFromServer(book)

        then:
        1 * gQuery.call('#lastBook') >> gQueryList
        1 * gQueryList.methodMissing('html', [lastBookHtml])
        0 * _
    }

    private title = 'title'
    private author = 'author'
    private year = '2012'
    private book = new Book(author: author, title: title, year: Integer.parseInt(year))
    private counter = Stub(Counter)
    private gQuery = Mock(GQuery)
    private gQueryList = Mock(GQueryList)
    private urlBooks = 'urlBooks'
    private bookListSelector = 'bookListSelector'
    private presenter = new BookPresenter(gQuery: gQuery, counter: counter,
            urlBooks: urlBooks, booksListSelector: bookListSelector,
            author: author, title: title, year: year
    )
}
