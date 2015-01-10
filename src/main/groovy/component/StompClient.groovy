package component

import org.grooscript.asts.GsNative

/**
 * Created by jorge on 27/12/14.
 */
class StompClient {

    Map subscriptions = [:]

    def subscribe(String path, Closure closure) {
        subscriptions[path] = closure
    }

    @GsNative
    def start(String webSocketUrl) {/*
        var socket = new SockJS(webSocketUrl);
        var stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            gSobject.subscriptions.each(function (key, value) {
                stompClient.subscribe(key, function(data){
                    value(gs.toGroovy(JSON.parse(data.body)));
                });
            });
        });
    */}
}
