function Colorable() {
  var gSobject = gs.inherit(gs.baseClass,'Colorable');
  gSobject.clazz = { name: 'Colorable', simpleName: 'Colorable'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.__defineGetter__('COLOR_CLASSES', function(){ return Colorable.COLOR_CLASSES; });
  gSobject.__defineSetter__('COLOR_CLASSES', function(gSval){ Colorable.COLOR_CLASSES = gSval; });
  gSobject['randomColor'] = function(it) {
    return Colorable.COLOR_CLASSES [ gs.mc(gs.random(),"nextInt",[gs.mc(Colorable.COLOR_CLASSES,"size",[])])];
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Colorable.COLOR_CLASSES = gs.list(["navy" , "blue" , "aqua" , "teal" , "olive" , "green" , "lime" , "yellow" , "orange" , "red" , "fuchsia" , "purple" , "gray" , "maroon"]);
