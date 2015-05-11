define(function () {
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
  gSobject['errorMessage'] = function(it) {
    var messages = gs.list([]);
    if (!gs.bool(gSobject.title)) {
      gs.mc(messages,'leftShift', gs.list(["Forgot title"]));
    };
    if (!gs.bool(gSobject.author)) {
      gs.mc(messages,'leftShift', gs.list(["Author missing"]));
    };
    if (gSobject.year <= 1900) {
      gs.mc(messages,'leftShift', gs.list(["At least XX century"]));
    };
    return gs.mc(messages,"join",["\n"]);
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};

return Book;
});