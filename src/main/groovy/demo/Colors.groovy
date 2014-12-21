package demo

class Colors {
    private static COLOR_CLASSES = [
        'navy','blue','aqua','teal','olive','green','lime','yellow', 'orange',
        'red','fuchsia','purple','gray','maroon'//,'silver','black'
    ]

    static randomColor() {
        COLOR_CLASSES[new Random().nextInt(COLOR_CLASSES.size())]
    }
}
