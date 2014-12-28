package component

import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryList
import spock.lang.Specification

/**
 * Created by jorge on 27/12/14.
 */
class CounterSpec extends Specification {

    void 'has traits'() {
        expect:
        counter.randomColor()
        counter.selector == SELECTOR
        counter.gQuery
    }

    void 'draw html'() {
        given:
        counter.selector = SELECTOR
        def closure = {
            p 'Hello!'
        }
        counter.html = closure

        when:
        counter.draw()

        then:
        1 * gQuery.call(SELECTOR) >> result
        1 * result.methodMissing('html', ['<p>Hello!</p>'])
    }

    void 'draw after inc'() {
        when:
        counter.selector = SELECTOR
        counter.inc()

        then:
        1 * gQuery.call(SELECTOR) >> result
        1 * result.methodMissing('html', _)
    }

    private static final SELECTOR = 'selector'
    GQueryList result = Mock(GQueryList)
    private GQuery gQuery = Mock(GQuery)
    def counter = new Counter(SELECTOR)
}
