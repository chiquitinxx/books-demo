package component

import org.grooscript.asts.GsNative

trait Chart {

    @GsNative
    def pieChart(selector, data) {/*
        new Chartist.Pie(selector, gs.toJavascript(data));
    */}
}
