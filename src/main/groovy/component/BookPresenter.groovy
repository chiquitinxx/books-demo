package component

import demo.model.Book
import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryImpl
import org.grooscript.templates.Templates

/**
 * Created by jorgefrancoleza on 13/1/15.
 */
class BookPresenter implements Chart {

    List<Book> books
    String urlBooks
    String booksListSelector
    Counter counter
    GQuery gQuery = new GQueryImpl()

    def initBooks() {
        gQuery.doRemoteCall(urlBooks, 'GET', null, { listBooks ->
            books = listBooks
            counter.value = books.size()
            drawPie()
        }, { msg ->
            println 'Error initBooks:'+msg
        })
    }

    def showBooks() {
        if (books) {
            def data = [listBooks: books, searchString: '']
            gQuery(booksListSelector).html Templates.applyTemplate('bookList.gtpl', data)
            gQuery.onChange('marking', this.&changeSearch)
        }
    }

    def changeSearch(searchText) {
        def data = [listBooks: books, searchString: searchText]
        gQuery('.tableSearch').html Templates.applyTemplate('bookTable.gtpl', data)
    }

    def close() {
        gQuery(booksListSelector).html ''
    }

    private drawPie() {
        def groups = books.
            sort(false) { it.year }.
            groupBy { it.year }
        def data = [
            labels: groups.collect { it.key }.reverse(),
            series: groups.collect { it.value.size() }.reverse()
        ]
        pieChart('.ct-chart', data);
    }
}
