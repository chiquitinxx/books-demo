package component

import spock.lang.Specification

/**
 * Created by jorge on 27/12/14.
 */
class CounterSpec extends Specification {
    def 'init counter'() {
        given:
        def where = 'selector'
        def number = 0

        when:
        def counter = new Counter(where, number)

        then:
        counter
    }
}
