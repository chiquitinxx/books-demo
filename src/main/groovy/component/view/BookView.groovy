package component.view

import component.Chart
import component.Counter
import org.grooscript.asts.GsNative
import org.grooscript.jquery.GQuery

/**
 * Created by jorgefrancoleza on 12/9/15.
 */
class BookView implements Chart {

    Counter booksCounter
    GQuery gQuery

    void startCounter(String counterSelector, Closure onClick) {
        booksCounter = new Counter()
        booksCounter.onClickShow = onClick
        booksCounter.start(counterSelector)
    }

    void updateBooksNumber(number) {
        booksCounter.number = number
    }

    void bindBookPropertiesTo(target) {
        gQuery.bindAllProperties(target)
    }

    void onAddNewBook(Closure action) {
        gQuery.onEvent('#addNewBook', 'click', action)
    }

    void onClearNewBook(Closure action) {
        gQuery('#clearBookButton').click(action)
    }

    void onConsole(String msg) {
        println msg
    }

    @GsNative
    void errorMessage(String head, String message) {/*
        swal(head, message, "error");
    */}
}
