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
    String title
    String author
    String year

    void init() {
        bindNewBook()
        clearNewBook()
        initBooks()
    }

    void addBookToServer() {
        Book book = new Book(author: author, title: title, year: Integer.parseInt(year))
        if (book.validate()) {
            gQuery.doRemoteCall('/addBook', 'POST', book, { data ->
                if (data.result == 'OK') {
                    clearNewBook()
                } else {
                    println "Validation error adding book."
                }
            }, { error ->
                println "Server error adding book: ${error}"
            })
        } else {
            println 'Validation not passed!'
        }
    }

    void showBooks() {
        if (books) {
            def data = [listBooks: books, searchString: '']
            gQuery(booksListSelector).html Templates.applyTemplate('bookList.gtpl', data)
            gQuery.onChange('marking', this.&changeSearch)
        }
    }

    void changeSearch(searchText) {
        def data = [listBooks: books, searchString: searchText]
        gQuery('.tableSearch').html Templates.applyTemplate('bookTable.gtpl', data)
    }

    void hideBooks() {
        gQuery(booksListSelector).html ''
    }

    void clearNewBook() {
        setAuthor('')
        setTitle('')
        setYear('')
    }

    void newBookFromServer(Book book) {
        books << book
        updateBooksNumber()
        updateLastBook(book)
        drawPie()
    }

    private bindNewBook() {
        gQuery.bindAllProperties(this)
        gQuery.onEvent('#addNewBook', 'click', this.&addBookToServer)
    }

    private initBooks() {
        gQuery.doRemoteCall(urlBooks, 'GET', null, { listBooks ->
            books = listBooks
            updateBooksNumber()
            drawPie()
        }, { msg ->
            println 'Error initBooks:'+msg
        })
    }

    private updateBooksNumber() {
        counter.value = books.size()
    }

    private drawPie() {
        def groups = books.sort(false) { it.year }.
                           groupBy { it.year }
        def data = [
            labels: groups.collect { it.key }.reverse(),
            series: groups.collect { it.value.size() }.reverse()
        ]
        pieChart('.ct-chart', data);
    }

    private updateLastBook(Book book) {
        gQuery('#lastBook').html Templates.applyTemplate('lastBook.gtpl', [last: book])
    }
}
