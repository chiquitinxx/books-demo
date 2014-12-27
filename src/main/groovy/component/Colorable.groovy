package component
/**
 * Created by jorge on 22/12/14.
 */
class Colorable {
    static COLOR_CLASSES = [
            'navy','blue','aqua','teal','olive','green','lime','yellow', 'orange',
            'red','fuchsia','purple','gray','maroon'//,'silver','black'
    ]

    String randomColor() {
        COLOR_CLASSES[new Random().nextInt(COLOR_CLASSES.size())]
    }
}