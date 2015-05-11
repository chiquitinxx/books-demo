package component

import component.ast.Component
import org.grooscript.jquery.GQuery

@Component
class Counter implements Colorable {

    Integer number
    Closure onClickShow

    void init() {
        number = null
    }

    void render() {
        div(class: "widget bg-${randomColor()}") {
            if (number) {
                p 'Number of books'
                em number ? number.toString() : '...'
                a(href:"#", class:"button small secondary", id: 'showButton') {
                    yield 'Show'
                }
            } else {
                p 'Reading books...'
            }
        }
    }

    void afterRender(GQuery gQuery) {
        gQuery.onEvent('#showButton', 'click', this.onClickShow)
    }
}
