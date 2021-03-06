function Templates() {
  var gSobject = gs.inherit(gs.baseClass,'Templates');
  gSobject.clazz = { name: 'org.grooscript.gradle.template.Templates', simpleName: 'Templates'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  Object.defineProperty(gSobject, 'templates', { get: function() { return Templates.templates; }, set: function(gSval) { Templates.templates = gSval; }, enumerable: true });
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
Templates.templates = gs.map().add("bookList.gtpl",function(model) {
  if (model === undefined) model = gs.map();
  return gs.mc(HtmlBuilder,"build",[function(it) {
    gs.mc(Templates,"div",[gs.map().add("class","search"), function(it) {
      return gs.mc(Templates,"p",[function(it) {
        gs.mc(Templates,"yield",["Search:"]);
        gs.mc(Templates,"input",[gs.map().add("id","marking").add("type","text")]);
        return gs.mc(Templates,"a",[gs.map().add("href","#").add("class","button tiny secondary").add("id","hideListBooks"), function(it) {
          return gs.mc(Templates,"yield",["Hide"]);
        }]);
      }]);
    }]);
    return gs.mc(Templates,"div",[gs.map().add("class","tableSearch"), function(it) {
      return gs.mc(Templates,"yieldUnescaped",[gs.execStatic(Templates,'applyTemplate', this,["bookTable.gtpl", model])]);
    }]);
  }]);
}).add("bookTable.gtpl",function(model) {
  if (model === undefined) model = gs.map();
  return gs.mc(HtmlBuilder,"build",[function(it) {
    return gs.mc(Templates,"table",[function(it) {
      gs.mc(Templates,"thead",[function(it) {
        return gs.mc(Templates,"tr",[function(it) {
          gs.mc(Templates,"th",[gs.map().add("id","titleHead").add("class","" + ((gs.bool(gs.gp(model,"sortByTitle")) ? "sortedField" : "")) + ""), function(it) {
            return gs.mc(Templates,"yield",["Title"]);
          }]);
          gs.mc(Templates,"th",["Author"]);
          return gs.mc(Templates,"th",["Year"]);
        }]);
      }]);
      var markLetters = function(data) {
        if (gs.bool(gs.gp(model,"searchString"))) {
          var upper = gs.mc(data,"toUpperCase",[]);
          var toSearch = gs.mc(gs.gp(model,"searchString"),"toUpperCase",[]);
          var i = gs.mc(upper,"indexOf",[toSearch]);
          var inc = 0;
          while (i >= 0) {
            var start = gs.plus(i, (gs.multiply(inc, 28)));
            data = (gs.plus((gs.plus(gs.mc(data,"substring",[0, start]), "<span class='bg-red'>" + (gs.mc(data,"substring",[start, gs.plus(start, gs.mc(toSearch,"size",[]))])) + "</span>")), gs.mc(data,"substring",[gs.plus(start, gs.mc(toSearch,"size",[]))])));
            inc++;
            i = gs.mc(upper,"indexOf",[toSearch, gs.plus(i, 1)]);
          };
        };
        return data;
      };
      return gs.mc(Templates,"tbody",[function(it) {
        var list = (gs.bool(gs.gp(model,"sortByTitle")) ? gs.mc(gs.gp(model,"listBooks"),"sort",[false, function(it) {
          return gs.gp(it,"title");
        }]) : gs.gp(model,"listBooks"));
        return gs.mc(list,"eachWithIndex",[function(book, i) {
          return gs.mc(Templates,"tr",[gs.map().add("class",(gs.equals((gs.mod(i, 2)), 0) ? "bg-silver" : "bg-white")), function(it) {
            gs.mc(Templates,"td",[function(it) {
              return gs.mc(Templates,"yieldUnescaped",[gs.execCall(markLetters, this, [gs.gp(book,"title")])]);
            }]);
            gs.mc(Templates,"td",[function(it) {
              return gs.mc(Templates,"yieldUnescaped",[gs.execCall(markLetters, this, [gs.gp(book,"author")])]);
            }]);
            return gs.mc(Templates,"td",[function(it) {
              return gs.mc(Templates,"yieldUnescaped",[gs.execCall(markLetters, this, [gs.mc(gs.gp(book,"year"),"toString",[])])]);
            }]);
          }]);
        }]);
      }]);
    }]);
  }]);
}).add("lastBook.gtpl",function(model) {
  if (model === undefined) model = gs.map();
  return gs.mc(HtmlBuilder,"build",[function(it) {
    gs.mc(Templates,"p",["Last book"]);
    gs.mc(Templates,"h3",[gs.gp(gs.fs('last', this),"title")]);
    return gs.mc(Templates,"p",[gs.mc(gs.gp(gs.fs('last', this),"year"),"toString",[])]);
  }]);
});
