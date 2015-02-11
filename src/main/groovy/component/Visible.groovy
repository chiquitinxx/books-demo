package component

import org.grooscript.builder.HtmlBuilder
import org.grooscript.jquery.GQuery
import org.grooscript.jquery.GQueryImpl

/**
 * Created by jorge on 27/12/14.
 */
trait Visible {
    GQuery gquery = new GQueryImpl()

    void draw(Closure html, String selector) {
        if (selector) {
            gquery.call(selector).html(HtmlBuilder.build(html))
        }
    }
}
