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
  var cl = Templates.templates[name];
  gs.sp(cl,"delegate",model);
  return gs.execCall(cl, this, [model]);
}
Templates.templates = gs.map().add("widgets.gtpl",function(model) {
  if (model === undefined) model = gs.map();
  return gs.mc(HtmlBuilder,"build",[function(it) {
    return gs.mc(Templates,"div",[gs.map().add("class","row"), function(it) {
      gs.mc(Templates,"div",[gs.map().add("class","small-12 medium-6 large-4 columns gridWidget").add("id","counter"), function(it) {
      }]);
      return gs.mc(Templates,"div",[gs.map().add("class","small-12 medium-6 large-4 columns gridWidget"), function(it) {
        return gs.mc(Templates,"div",[gs.map().add("class","bg-red widget"), function(it) {
          gs.mc(Templates,"p",["Last book"]);
          gs.mc(Templates,"h3",[gs.gp(gs.fs('last', this),"title")]);
          return gs.mc(Templates,"p",[gs.gp(gs.fs('last', this),"year")]);
        }]);
      }]);
    }]);
  }]);
});
