function Book() {
  var gSobject = gs.inherit(gs.baseClass,'Book');
  gSobject.clazz = { name: 'demo.model.Book', simpleName: 'Book'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.id = null;
  gSobject.title = null;
  gSobject.author = null;
  gSobject.year = null;
  gSobject['validate'] = function(it) {
    return ((gs.bool(gSobject.title)) && (gs.bool(gSobject.author))) && (gSobject.year > 1900);
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
