package component

trait Colorable {
    def colorClasses = [
            'navy','blue','aqua','teal','olive','green','lime','yellow', 'orange',
            'red','fuchsia','purple','gray','maroon'//,'silver','black'
    ]

    def randomColor() {
        colorClasses[new Random().nextInt(colorClasses.size())]
    }
}