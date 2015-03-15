package component

/**
 * Created by jorge on 27/12/14.
 */
class Counter implements Visible, Colorable {

    String selector

    Counter(String where) {
        selector = where
    }

    def init(numberValue) {
        def html = {
            div(class: "widget bg-${randomColor()}") {
                p 'Number of books'
                em numberValue.toString()
                a(href:"#", class:"button small secondary", onclick: 'bookPresenter.showBooks()') {
                    yield 'Show'
                }
            }
        }
        draw(html, selector)
    }

    def setValue(newValue) {
        gquery.call('#counter em').text newValue
    }
}
