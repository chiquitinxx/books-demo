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
                a(href:"#", class:"button small secondary") {
                    yield 'Show'
                }
            }
        }
        selector = where
        draw()
    }

    def inc() {
        value++
        gquery.call('.counter em').text value
    }
}
