package component

import org.grooscript.asts.GsNative

/**
 * Created by jorgefrancoleza on 14/1/15.
 */
trait Chart {

    @GsNative
    def pieChart(selector, data) {/*
        new Chartist.Pie(selector, gs.toJavascript(data));
    */}
}
