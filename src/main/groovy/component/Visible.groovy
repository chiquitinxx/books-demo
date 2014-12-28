package component

import org.grooscript.builder.HtmlBuilder
import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryImpl

/**
 * Created by jorge on 27/12/14.
 */
trait Visible {
    String selector
    Closure html
    GQuery gquery = new GQueryImpl()

    void draw() {
        if (selector) {
            gquery.call(selector).html(HtmlBuilder.build(html))
        }
    }
}
