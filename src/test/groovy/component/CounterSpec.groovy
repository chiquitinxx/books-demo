package component

import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryList
import spock.lang.Specification

/**
 * Created by jorge on 27/12/14.
 */
class CounterSpec extends Specification {

    def 'create counter'() {
        when:
        def counter = new Counter(SELECTOR)

        then:
        counter.selector == SELECTOR
    }

    def 'nothing to do if selector is empty'() {
        given:
        def initialValue = 7
        def counter = new Counter()

        when:
        counter.gquery = gQuery
        counter.init(initialValue)

        then:
        0 * _
    }

    def 'init counter'() {
        given:
        def initialValue = 7
        def counter = new Counter(SELECTOR)

        when:
        counter.gquery = gQuery
        counter.colorClasses = ['aqua']
        counter.init(initialValue)

        then:
        1 * gQueryResult.methodMissing('html', { it[0].contains('<p>Number of books</p><em>7</em>') &&
            it[0].contains('<div class=\'widget bg-aqua\'>')
        })
    }

    def 'change counter value'() {
        given:
        def newValue = 8
        def counter = new Counter(SELECTOR)

        when:
        counter.gquery = gQuery
        counter.value = newValue

        then:
        1 * gQueryResultCounter.methodMissing('text', { it[0] == newValue })
    }

    private static final SELECTOR = 'selector'
    private gQueryResult = Mock(GQueryList)
    private gQueryResultCounter = Mock(GQueryList)
    private gQuery = Stub(GQuery) {
        it.call(SELECTOR) >> gQueryResult
        it.call('#counter em') >> gQueryResultCounter
    }
}
