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
  Visible.$init$(gSobject);
  gSobject.setGquery = function(x1) { return Visible.setGquery(gSobject,x1); }
  gSobject.draw = function(x1,x2) { return Visible.draw(gSobject,x1,x2); }
  gSobject.getGquery = function() { return Visible.getGquery(gSobject); }
  if (Colorable['setProperty']) {
    gSobject.setProperty = function(x1) { return Colorable.setProperty(gSobject,x1); }
  }
  if (Colorable['getProperty']) {
    gSobject.getProperty = function() { return Colorable.getProperty(gSobject); }
  }
  Colorable.$init$(gSobject);
  gSobject.getColorClasses = function() { return Colorable.getColorClasses(gSobject); }
  gSobject.setColorClasses = function(x1) { return Colorable.setColorClasses(gSobject,x1); }
  gSobject.randomColor = function() { return Colorable.randomColor(gSobject); }
  gSobject['setValue'] = function(newValue) {
    return gs.mc(gs.execCall(gSobject.getGquery(), this, ["#counter em"]),"text",[newValue]);
  }
  gSobject['Counter2'] = function(where, numberValue) {
    var html = function(it) {
      return gs.mc(this,"div",[gs.map().add("class","widget bg-" + (gs.mc(this,"randomColor",[], gSobject)) + ""), function(it) {
        gs.mc(this,"p",["Number of books"], gSobject);
        gs.mc(this,"em",[gs.mc(numberValue,"toString",[])], gSobject);
        return gs.mc(this,"a",[gs.map().add("href","#").add("class","button small secondary").add("onclick","bookPresenter.showBooks()"), function(it) {
          return gs.mc(this,"yield",["Show"], gSobject);
        }], gSobject);
      }], gSobject);
    };
    gs.mc(this,"draw",[html, where], gSobject);
    return this;
  }
  if (arguments.length==2) {gSobject.Counter2(arguments[0], arguments[1]); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
