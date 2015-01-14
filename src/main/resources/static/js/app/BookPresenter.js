function BookPresenter() {
  var gSobject = gs.inherit(gs.baseClass,'BookPresenter');
  gSobject.clazz = { name: 'component.BookPresenter', simpleName: 'BookPresenter'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.clazz.interfaces = [{ name: 'component.Chart', simpleName: 'Chart'}];
  if (Chart['setProperty']) {
    gSobject.setProperty = function(x1) { return Chart.setProperty(gSobject,x1); }
  }
  if (Chart['getProperty']) {
    gSobject.getProperty = function() { return Chart.getProperty(gSobject); }
  }
  Chart.$init$(gSobject);
  gSobject.pieChart = function(x1,x2) { return Chart.pieChart(gSobject,x1,x2); }
  gSobject.books = null;
  gSobject.urlBooks = null;
  gSobject.booksListSelector = null;
  gSobject.counter = null;
  gSobject.gQuery = GQueryImpl();
  gSobject['initBooks'] = function(it) {
    return gs.mc(gSobject.gQuery,"doRemoteCall",[gSobject.urlBooks, "GET", null, function(listBooks) {
      gSobject.books = listBooks;
      gs.sp(gSobject.counter,"value",gs.mc(gSobject.books,"size",[]));
      return gs.mc(gSobject,"drawPie",[]);
    }, function(msg) {
      return gs.println(gs.plus("Error initBooks:", msg));
    }]);
  }
  gSobject['showBooks'] = function(it) {
    if (gs.bool(gSobject.books)) {
      var data = gs.map().add("listBooks",gSobject.books).add("searchString","");
      gs.mc(gs.mc(gSobject,"gQuery",[gSobject.booksListSelector]),"html",[gs.execStatic(Templates,'applyTemplate', this,["bookList.gtpl", data])]);
      return gs.mc(gSobject.gQuery,"onChange",["marking", gSobject["changeSearch"]]);
    };
  }
  gSobject['changeSearch'] = function(searchText) {
    var data = gs.map().add("listBooks",gSobject.books).add("searchString",searchText);
    return gs.mc(gs.mc(gSobject,"gQuery",[".tableSearch"]),"html",[gs.execStatic(Templates,'applyTemplate', this,["bookTable.gtpl", data])]);
  }
  gSobject['close'] = function(it) {
    return gs.mc(gs.mc(gSobject,"gQuery",[gSobject.booksListSelector]),"html",[""]);
  }
  gSobject['drawPie'] = function(it) {
    var groups = gs.mc(gs.mc(gSobject.books,"sort",[false, function(it) {
      return gs.gp(it,"year");
    }]),"groupBy",[function(it) {
      return gs.gp(it,"year");
    }]);
    var data = gs.map().add("labels",gs.mc(gs.mc(groups,"collect",[function(it) {
      return gs.gp(it,"key");
    }]),"reverse",[])).add("series",gs.mc(gs.mc(groups,"collect",[function(it) {
      return gs.mc(gs.gp(it,"value"),"size",[]);
    }]),"reverse",[]));
    return gs.mc(this,"pieChart",[".ct-chart", data], gSobject);
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
