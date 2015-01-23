function Counter() {
  var gSobject = gs.inherit(gs.baseClass,'Counter');
  gSobject.clazz = { name: 'component.Counter', simpleName: 'Counter'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.clazz.interfaces = [{ name: 'component.Visible', simpleName: 'Visible'}, { name: 'component.Colorable', simpleName: 'Colorable'}];
  if (Visible['setProperty']) {
    gSobject.setProperty = function(x1) { return Visible.setProperty(gSobject,x1); }
  }
  if (Visible['getProperty']) {
    gSobject.getProperty = function() { return Visible.getProperty(gSobject); }
  }
  gSobject.getSelector = function() { return Visible.getSelector(gSobject); }
  gSobject.getHtml = function() { return Visible.getHtml(gSobject); }
  Visible.$init$(gSobject);
  gSobject.draw = function() { return Visible.draw(gSobject); }
  gSobject.setSelector = function(x1) { return Visible.setSelector(gSobject,x1); }
  gSobject.setHtml = function(x1) { return Visible.setHtml(gSobject,x1); }
  gSobject.getGquery = function() { return Visible.getGquery(gSobject); }
  gSobject.setGquery = function(x1) { return Visible.setGquery(gSobject,x1); }
  if (Colorable['setProperty']) {
    gSobject.setProperty = function(x1) { return Colorable.setProperty(gSobject,x1); }
  }
  if (Colorable['getProperty']) {
    gSobject.getProperty = function() { return Colorable.getProperty(gSobject); }
  }
  Colorable.$init$(gSobject);
  gSobject.setCOLOR_CLASSES = function(x0) {  Counter.COLOR_CLASSES = x0 };
  gSobject.getCOLOR_CLASSES = function() {  return Counter.COLOR_CLASSES };
  gSobject.value = null;
  gSobject['randomColor'] = function(it) {
    return gSobject.getCOLOR_CLASSES()[gs.mc(gs.random(),"nextInt",[gs.mc(gSobject.getCOLOR_CLASSES(),"size",[])])];
  }
  gSobject['setValue'] = function(newValue) {
    gSobject.value = newValue;
    return gs.mc(gs.execCall(gSobject.getGquery(), this, ["#counter em"]),"text",[gSobject.value]);
  }
  gSobject['Counter2'] = function(where, numberValue) {
    gSobject.value = numberValue;
    gSobject.setHtml(function(it) {
      return gs.mc(this,"div",[gs.map().add("class","widget bg-" + (gs.mc(gSobject,"randomColor",[])) + ""), function(it) {
        gs.mc(this,"p",["Number of books"], gSobject);
        gs.mc(this,"em",[numberValue], gSobject);
        return gs.mc(this,"a",[gs.map().add("href","#").add("class","button small secondary").add("onclick","bookPresenter.showBooks()"), function(it) {
          return gs.mc(this,"yield",["Show"], gSobject);
        }], gSobject);
      }], gSobject);
    });
    gSobject.setSelector(where);
    gs.mc(this,"draw",[], gSobject);
    return this;
  }
  if (arguments.length==2) {gSobject.Counter2(arguments[0], arguments[1]); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Colorable$static$init$(Counter);
