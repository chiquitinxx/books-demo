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
        value = 0
        html = {
            p(class: "bg-${randomColor()}") {
                yieldUnescaped value.toString()
            }
        }
        selector = where
        draw()
    }

    def inc() {
        value++
        draw()
    }
}
