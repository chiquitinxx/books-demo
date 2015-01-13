package component

/**
 * Created by jorge on 27/12/14.
 */
class Counter implements Visible, Colorable {

    def value

    String randomColor() {
        COLOR_CLASSES[new Random().nextInt(COLOR_CLASSES.size())]
    }

    Counter(String where, numberValue) {
        value = numberValue
        html = {
            div(class: "widget bg-${randomColor()}") {
                p 'Number of books'
                em numberValue
                a(href:"#", class:"button small secondary", onclick: 'bookPresenter.showBooks()') {
                    yield 'Show'
                }
            }
        }
        selector = where
        draw()
    }

    def setValue(newValue) {
        value = newValue
        gquery.call('#counter em').text value
    }
}
