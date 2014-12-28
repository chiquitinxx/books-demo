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
  gSobject.setSelector = function(x1) { return Visible.setSelector(gSobject,x1); }
  gSobject.draw = function() { return Visible.draw(gSobject); }
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
  gSobject.randomColor = function() { return Colorable.randomColor(gSobject); }
  gSobject.getCOLOR_CLASSES = function() { return Colorable.getCOLOR_CLASSES(gSobject); }
  gSobject.setCOLOR_CLASSES = function(x1) { return Colorable.setCOLOR_CLASSES(gSobject,x1); }
  gSobject.value = null;
  gSobject['inc'] = function(it) {
    gSobject.value++;
    return gs.mc(this,"draw",[], gSobject);
  }
  gSobject['Counter1'] = function(selector) {
    gSobject.value = 0;
    html = function(it) {
      return gs.mc(this,"p",[gs.map().add("class","bg-" + (gs.mc(this,"randomColor",[], gSobject)) + ""), function(it) {
        return gs.mc(this,"yieldUnescaped",[gs.mc(gSobject.value,"toString",[])], gSobject);
      }], gSobject);
    };
    gs.sp(this,"selector",selector);
    gs.mc(this,"draw",[], gSobject);
    return this;
  }
  if (arguments.length==1) {gSobject.Counter1(arguments[0]); }
  
  return gSobject;
};
