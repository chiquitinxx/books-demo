package component

import component.ast.Component

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
                a(href:"#", class:"button small secondary", onclick: 'bookPresenter.showListBooks()') {
                    yield 'Show'
                }
            } else {
                p 'Reading books...'
            }
        }
    }
}
