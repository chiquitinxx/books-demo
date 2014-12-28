package component

/**
 * Created by jorge on 27/12/14.
 */
class Counter implements Visible, Colorable {

    def value

    Counter(String selector) {
        value = 0
        html = {
            p(class: "bg-${randomColor()}") {
                yieldUnescaped value.toString()
            }
        }
        this.selector = selector
        draw()
    }

    def inc() {
        value++
        draw()
    }
}
