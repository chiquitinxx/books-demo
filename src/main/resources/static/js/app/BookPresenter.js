function BookPresenter() {
  var gSobject = gs.inherit(gs.baseClass,'BookPresenter');
  gSobject.clazz = { name: 'component.BookPresenter', simpleName: 'BookPresenter'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.books = null;
  gSobject.urlBooks = null;
  gSobject.booksListSelector = null;
  gSobject.counter = null;
  gSobject.gQuery = GQueryImpl();
  gSobject['initBooks'] = function(it) {
    return gs.mc(gSobject.gQuery,"doRemoteCall",[gSobject.urlBooks, "GET", null, function(listBooks) {
      gSobject.books = listBooks;
      return gs.sp(gSobject.counter,"value",gs.mc(gSobject.books,"size",[]));
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
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
