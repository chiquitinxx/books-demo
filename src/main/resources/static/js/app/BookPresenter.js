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
  gSobject.pieChart = function(x1,x2) { return Chart.pieChart(gSobject,x1,x2); }
  Chart.$init$(gSobject);
  gSobject.books = null;
  gSobject.urlBooks = null;
  gSobject.booksListSelector = null;
  gSobject.counter = null;
  gSobject.gQuery = GQueryImpl();
  gSobject.title = null;
  gSobject.author = null;
  gSobject.year = null;
  gSobject['init'] = function(it) {
    gs.mc(gSobject,"bindNewBook",[]);
    gs.mc(gSobject,"clearNewBook",[]);
    return gs.mc(gSobject,"initBooks",[]);
  }
  gSobject['addBookToServer'] = function(it) {
    var book = Book(gs.map().add("author",gSobject.author).add("title",gSobject.title).add("year",parseInt(gSobject.year)));
    if (gs.mc(book,"validate",[])) {
      return gs.mc(gSobject.gQuery,"doRemoteCall",["/addBook", "POST", book, function(data) {
        if (gs.equals(gs.gp(data,"result"), "OK")) {
          return gs.mc(gSobject,"clearNewBook",[]);
        } else {
          return gs.println("Validation error adding book.");
        };
      }, function(error) {
        return gs.println("Server error adding book: " + (error) + "");
      }]);
    } else {
      return gs.println("Validation not passed!");
    };
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
  gSobject['hideBooks'] = function(it) {
    return gs.mc(gs.mc(gSobject,"gQuery",[gSobject.booksListSelector]),"html",[""]);
  }
  gSobject['clearNewBook'] = function(it) {
    gs.mc(this,"setAuthor",[""], gSobject);
    gs.mc(this,"setTitle",[""], gSobject);
    return gs.mc(this,"setYear",[""], gSobject);
  }
  gSobject['newBookFromServer'] = function(book) {
    gs.mc(gSobject.books,'leftShift', gs.list([book]));
    gs.mc(gSobject,"updateBooksNumber",[]);
    gs.mc(gSobject,"updateLastBook",[book]);
    return gs.mc(gSobject,"drawPie",[]);
  }
  gSobject['bindNewBook'] = function(it) {
    gs.mc(gSobject.gQuery,"bindAllProperties",[this]);
    return gs.mc(gSobject.gQuery,"onEvent",["#addNewBook", "click", gSobject["addBookToServer"]]);
  }
  gSobject['initBooks'] = function(it) {
    return gs.mc(gSobject.gQuery,"doRemoteCall",[gSobject.urlBooks, "GET", null, function(listBooks) {
      gSobject.books = listBooks;
      gs.mc(gSobject,"updateBooksNumber",[]);
      return gs.mc(gSobject,"drawPie",[]);
    }, function(msg) {
      return gs.println(gs.plus("Error initBooks:", msg));
    }]);
  }
  gSobject['updateBooksNumber'] = function(it) {
    return gs.sp(gSobject.counter,"value",gs.mc(gSobject.books,"size",[]));
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
  gSobject['updateLastBook'] = function(book) {
    return gs.mc(gs.mc(gSobject,"gQuery",["#lastBook"]),"html",[gs.execStatic(Templates,'applyTemplate', this,["lastBook.gtpl", gs.map().add("last",book)])]);
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
