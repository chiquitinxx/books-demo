function Templates() {
  var gSobject = gs.inherit(gs.baseClass,'Templates');
  gSobject.clazz = { name: 'org.grooscript.gradle.template.Templates', simpleName: 'Templates'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.__defineGetter__('templates', function(){ return Templates.templates; });
  gSobject.__defineSetter__('templates', function(gSval){ Templates.templates = gSval; });
  gSobject.applyTemplate = function(x0,x1) { return Templates.applyTemplate(x0,x1); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
Templates.applyTemplate = function(name, model) {
  if (model === undefined) model = gs.map();
  var cl = Templates.templates [ name];
  gs.sp(cl,"delegate",model);
  return (cl.delegate!=undefined?gs.applyDelegate(cl,cl.delegate,[model]):gs.execCall(cl, this, [model]));
}
Templates.templates = gs.map().add("bookList.gtpl",function(model) {
  if (model === undefined) model = gs.map();
  return gs.mc(HtmlBuilder,"build",[function(it) {
    return gs.mc(Templates,"ul",[function(it) {
      gs.mc(gs.fs('books', this),"each",[function(book) {
        return gs.mc(Templates,"li",[gs.map().add("class","bg-white book"), function(it) {
          gs.mc(Templates,"h2",[gs.gp(book,"tittle")]);
          gs.mc(Templates,"p",[gs.gp(book,"id")]);
          gs.mc(Templates,"p",[gs.plus("Author/a: ", gs.gp(book,"author"))]);
          return gs.mc(Templates,"p",[gs.gp(book,"description")]);
        }]);
      }]);
      return gs.mc(Templates,"li",[gs.map().add("class","bg-black book").add("onClick","console.log('Click!');"), function(it) {
        return gs.mc(Templates,"h2",["Do something..."]);
      }]);
    }]);
  }]);
});
