function StompClient() {
  var gSobject = gs.inherit(gs.baseClass,'StompClient');
  gSobject.clazz = { name: 'component.StompClient', simpleName: 'StompClient'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.subscriptions = gs.map();
  gSobject['subscribe'] = function(path, closure) {
    return (gSobject.subscriptions[path]) = closure;
  }
  gSobject.start = function(webSocketUrl) {
    var socket = new SockJS(webSocketUrl);
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame);
            gSobject.subscriptions.each(function (key, value) {
                stompClient.subscribe(key, function(data){
                    value(gs.toGroovy(JSON.parse(data.body)));
                });
            });
        });
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
