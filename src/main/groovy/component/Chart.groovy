package component

import org.grooscript.asts.GsNative

trait Chart {

    @GsNative
    def pieChart(String selector, Map data) {/*
        new Chartist.Pie(selector, gs.toJavascript(data));
    */}
}
