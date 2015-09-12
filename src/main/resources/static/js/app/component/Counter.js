define(['component/Colorable'], function (Colorable) {
  
  function Counter() {
    var gSobject = gs.inherit(gs.baseClass,'Counter');
    gSobject.clazz = { name: 'component.Counter', simpleName: 'Counter'};
    gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
    gSobject.clazz.interfaces = [{ name: 'component.Colorable', simpleName: 'Colorable'}];
    if (Colorable['setProperty']) {
      gSobject.setProperty = function(x1) { return Colorable.setProperty(gSobject,x1); }
    }
    if (Colorable['getProperty']) {
      gSobject.getProperty = function() { return Colorable.getProperty(gSobject); }
    }
    gSobject.randomColor = function() { return Colorable.randomColor(gSobject); }
    gSobject.setColorClasses = function(x1) { return Colorable.setColorClasses(gSobject,x1); }
    Colorable.$init$(gSobject);
    gSobject.getColorClasses = function() { return Colorable.getColorClasses(gSobject); }
    gSobject.number = null;
    gSobject.onClickShow = null;
    gSobject.gQuery = GQueryImpl();
    gSobject.selector = null;
    gSobject['init'] = function(it) {
      return gSobject.number = null;
    }
    gSobject['render'] = function(it) {
      gs.mc(gs.execCall(gs.gp(gs.thisOrObject(this,gSobject),"gQuery"), this, [gSobject.selector]),"html",[gs.execStatic(HtmlBuilder,'build', this,[function(it) {
        return gs.mc(this,"div",[gs.map().add("class","widget bg-" + (gs.mc(this,"randomColor",[], gSobject)) + ""), function(it) {
          if (gs.bool(gSobject.number)) {
            gs.mc(this,"p",["Number of books"], gSobject);
            gs.mc(this,"em",[(gs.bool(gSobject.number) ? gs.mc(gSobject.number,"toString",[]) : "...")], gSobject);
            return gs.mc(this,"a",[gs.map().add("href","#").add("class","button small secondary").add("id","showButton"), function(it) {
              return gs.mc(this,"yield",["Show"], gSobject);
            }], gSobject);
          } else {
            return gs.mc(this,"p",["Reading books..."], gSobject);
          };
        }], gSobject);
      }])]);
      return gs.mc(gSobject,"afterRender",[gs.gp(gs.thisOrObject(this,gSobject),"gQuery")]);
    }
    gSobject['afterRender'] = function(gQuery) {
      return gs.mc(gQuery,"onEvent",["#showButton", "click", gs.gp(gs.thisOrObject(this,gSobject),"onClickShow")]);
    }
    gSobject['start'] = function(selector) {
      gs.sp(this,"selector",selector);
      gs.mc(gSobject,"init",[]);
      return gs.mc(gSobject,"render",[]);
    }
    gSobject['setNumber'] = function(number) {
      this["number"] = number;
      return gs.mc(gSobject,"render",[]);
    }
    if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
    
    return gSobject;
  };
  
  return Counter;
});