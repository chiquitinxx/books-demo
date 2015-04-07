package component

import component.ast.Component

/**
 * Created by jorge on 27/12/14.
 */
@Component
class Counter implements Colorable {

    Integer number

    void init() {
        number = null
    }

    void render() {
        div(class: "widget bg-${randomColor()}") {
            if (number) {
                p 'Number of books'
                em number ? number.toString() : '...'
                a(href:"#", class:"button small secondary", onclick: 'bookPresenter.showBooks()') {
                    yield 'Show'
                }
            } else {
                p 'Reading books...'
            }
        }
    }
}
