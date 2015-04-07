package component

import spock.lang.Specification

/**
 * Created by jorge on 27/12/14.
 */
class CounterSpec extends Specification {

    def 'init counter'() {
        when:
        def counter = new Counter()
        counter.init()

        then:
        counter.number == null
        counter.colorClasses
    }
}
