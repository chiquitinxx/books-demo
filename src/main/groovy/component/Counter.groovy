package component

/**
 * Created by jorge on 27/12/14.
 */
class Counter implements Visible, Colorable {

    def value

    String randomColor() {
        COLOR_CLASSES[new Random().nextInt(COLOR_CLASSES.size())]
    }

    Counter(String where) {
        html = {
            div(class: "counter bg-${randomColor()}") {
                p 'Counter'
                em value.toString()
                a(href:"#", class:"button small secondary", onclick: 'counter.reset()') {
                    yield 'Reset'
                }
            }
        }
        selector = where
        reset()
    }

    def inc() {
        value++
        gquery.call('.counter em').text value
    }

    def reset() {
        value = 0
        draw()
    }
}
