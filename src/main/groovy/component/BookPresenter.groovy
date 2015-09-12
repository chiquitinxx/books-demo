package component

import component.view.BookView
import demo.model.Book
import org.grooscript.asts.RequireJsModule
import org.grooscript.jquery.GQuery
import org.grooscript.templates.Templates

class BookPresenter {

    List<Book> books = []
    String urlBooks
    String booksListSelector
    String counterSelector
    String pieChartSelector

    BookView view
    GQuery gQuery
    boolean sortByTitle = false

    //New book properties
    String title
    String author
    String year

    @RequireJsModule(path = 'messages')
    def messages

    void init() {
        view.startCounter(counterSelector, this.&showListBooks)
        view.bindBookPropertiesTo(this)
        view.onAddNewBook(this.&addBookToServer)
        view.onClearNewBook(this.&clearNewBook)
        clearNewBook()
        getBooksFromServer()
        view.onConsole messages.salute
    }

    void addBookToServer() {
        Book book = new Book(author: author, title: title, year: year ? Integer.parseInt(year) : 0 )
        if (book.validate()) {
            gQuery.doRemoteCall('/addBook', 'POST', book, { data ->
                if (data.result == 'OK') {
                    clearNewBook()
                } else {
                    view.errorMessage 'Error', 'Validation server error adding book.'
                }
            }, { error ->
                view.errorMessage 'Error', "Server error adding book: ${error}"
            })
        } else {
            view.errorMessage('Nope', book.errorMessage())
        }
    }

    void newBookFromServer(Book book) {
        books << book
        if (gQuery('.tableSearch')) {
            println 'Changing!'
            changeSearchText(gQuery('#marking').val())
        }
        view.updateBooksNumber(books.size())
        updateLastBook(book)
        drawPie()
    }

    void showListBooks() {
        if (books) {
            def data = [listBooks: books, searchString: '']
            gQuery(booksListSelector).html Templates.applyTemplate('bookList.gtpl', data)
            gQuery.onChange('marking', this.&changeSearchText)
            gQuery.onEvent('#hideListBooks', 'click', this.&hideListBooks)
            sortByTitleEvent()
        }
    }

    void changeSearchText(searchText) {
        def data = [listBooks: books, searchString: searchText, sortByTitle: sortByTitle]
        gQuery('.tableSearch').html Templates.applyTemplate('bookTable.gtpl', data)
        sortByTitleEvent()
    }

    void changeSort() {
        sortByTitle = !sortByTitle
        changeSearchText(gQuery('#marking').val())
    }

    void hideListBooks() {
        gQuery(booksListSelector).html ''
    }

    void clearNewBook() {
        setAuthor('')
        setTitle('')
        setYear('')
    }

    void onReceiveBooks(List<Book> listBooks) {
        books = listBooks
        view.updateBooksNumber(listBooks.size())
        drawPie()
    }

    private void getBooksFromServer() {
        gQuery.doRemoteCall(urlBooks, 'GET', null, this.&onReceiveBooks, {msg ->
            view.errorMessage 'Error', "Error getBooksFromServer: $msg"
        })
    }

    private void drawPie() {
        def groups = books.sort(false) { it.year }.
                           groupBy { it.year }
        def data = [
            labels: groups.collect { it.key }.reverse(),
            series: groups.collect { it.value.size() }.reverse()
        ]
        view.pieChart(pieChartSelector, data) //'.ct-chart'
    }

    private void updateLastBook(Book book) {
        gQuery('#lastBook').html Templates.applyTemplate('lastBook.gtpl', [last: book])
    }

    private void sortByTitleEvent() {
        gQuery.onEvent('#titleHead', 'click', this.&changeSort)
    }
}
