define(['component/view/BookView','demo/model/Book','messages'], function (BookView,Book,messages) {
  
  function BookPresenter() {
    var gSobject = gs.inherit(gs.baseClass,'BookPresenter');
    gSobject.clazz = { name: 'component.BookPresenter', simpleName: 'BookPresenter'};
    gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
    gSobject.books = gs.list([]);
    gSobject.urlBooks = null;
    gSobject.booksListSelector = null;
    gSobject.counterSelector = null;
    gSobject.pieChartSelector = null;
    gSobject.view = null;
    gSobject.gQuery = null;
    gSobject.sortByTitle = false;
    gSobject.title = null;
    gSobject.author = null;
    gSobject.year = null;
    gSobject.messages = messages;
    gSobject['init'] = function(it) {
      gs.mc(gSobject.view,"startCounter",[gSobject.counterSelector, gSobject["showListBooks"]]);
      gs.mc(gSobject.view,"bindBookPropertiesTo",[this]);
      gs.mc(gSobject.view,"onAddNewBook",[gSobject["addBookToServer"]]);
      gs.mc(gSobject.view,"onClearNewBook",[gSobject["clearNewBook"]]);
      gs.mc(gSobject,"clearNewBook",[]);
      gs.mc(gSobject,"getBooksFromServer",[]);
      return gs.mc(gSobject.view,"onConsole",[gs.gp(gSobject.messages,"salute")]);
    }
    gSobject['addBookToServer'] = function(it) {
      var book = Book(gs.map().add("author",gSobject.author).add("title",gSobject.title).add("year",(gs.bool(gSobject.year) ? parseInt(gSobject.year) : 0)));
      if (gs.mc(book,"validate",[])) {
        return gs.mc(gSobject.gQuery,"doRemoteCall",["/addBook", "POST", book, function(data) {
          if (gs.equals(gs.gp(data,"result"), "OK")) {
            return gs.mc(gSobject,"clearNewBook",[]);
          } else {
            return gs.mc(gSobject.view,"errorMessage",["Error", "Validation server error adding book."]);
          };
        }, function(error) {
          return gs.mc(gSobject.view,"errorMessage",["Error", "Server error adding book: " + (error) + ""]);
        }]);
      } else {
        return gs.mc(gSobject.view,"errorMessage",["Nope", gs.mc(book,"errorMessage",[])]);
      };
    }
    gSobject['newBookFromServer'] = function(book) {
      gs.mc(gSobject.books,'leftShift', gs.list([book]));
      if (gs.mc(gSobject,"gQuery",[".tableSearch"])) {
        gs.println("Changing!");
        gs.mc(gSobject,"changeSearchText",[gs.mc(gs.mc(gSobject,"gQuery",["#marking"]),"val",[])]);
      };
      gs.mc(gSobject.view,"updateBooksNumber",[gs.mc(gSobject.books,"size",[])]);
      gs.mc(gSobject,"updateLastBook",[book]);
      return gs.mc(gSobject,"drawPie",[]);
    }
    gSobject['showListBooks'] = function(it) {
      if (gs.bool(gSobject.books)) {
        var data = gs.map().add("listBooks",gSobject.books).add("searchString","");
        gs.mc(gs.mc(gSobject,"gQuery",[gSobject.booksListSelector]),"html",[gs.execStatic(Templates,'applyTemplate', this,["bookList.gtpl", data])]);
        gs.mc(gSobject.gQuery,"onChange",["marking", gSobject["changeSearchText"]]);
        gs.mc(gSobject.gQuery,"onEvent",["#hideListBooks", "click", gSobject["hideListBooks"]]);
        return gs.mc(gSobject,"sortByTitleEvent",[]);
      };
    }
    gSobject['changeSearchText'] = function(searchText) {
      var data = gs.map().add("listBooks",gSobject.books).add("searchString",searchText).add("sortByTitle",gSobject.sortByTitle);
      gs.mc(gs.mc(gSobject,"gQuery",[".tableSearch"]),"html",[gs.execStatic(Templates,'applyTemplate', this,["bookTable.gtpl", data])]);
      return gs.mc(gSobject,"sortByTitleEvent",[]);
    }
    gSobject['changeSort'] = function(it) {
      gSobject.sortByTitle = !gSobject.sortByTitle;
      return gs.mc(gSobject,"changeSearchText",[gs.mc(gs.mc(gSobject,"gQuery",["#marking"]),"val",[])]);
    }
    gSobject['hideListBooks'] = function(it) {
      return gs.mc(gs.mc(gSobject,"gQuery",[gSobject.booksListSelector]),"html",[""]);
    }
    gSobject['clearNewBook'] = function(it) {
      gs.mc(this,"setAuthor",[""], gSobject);
      gs.mc(this,"setTitle",[""], gSobject);
      return gs.mc(this,"setYear",[""], gSobject);
    }
    gSobject['onReceiveBooks'] = function(listBooks) {
      gSobject.books = listBooks;
      gs.mc(gSobject.view,"updateBooksNumber",[gs.mc(listBooks,"size",[])]);
      return gs.mc(gSobject,"drawPie",[]);
    }
    gSobject['getBooksFromServer'] = function(it) {
      return gs.mc(gSobject.gQuery,"doRemoteCall",[gSobject.urlBooks, "GET", null, gSobject["onReceiveBooks"], function(msg) {
        return gs.mc(gSobject.view,"errorMessage",["Error", "Error getBooksFromServer: " + (msg) + ""]);
      }]);
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
      return gs.mc(gSobject.view,"pieChart",[gSobject.pieChartSelector, data]);
    }
    gSobject['updateLastBook'] = function(book) {
      return gs.mc(gs.mc(gSobject,"gQuery",["#lastBook"]),"html",[gs.execStatic(Templates,'applyTemplate', this,["lastBook.gtpl", gs.map().add("last",book)])]);
    }
    gSobject['sortByTitleEvent'] = function(it) {
      return gs.mc(gSobject.gQuery,"onEvent",["#titleHead", "click", gSobject["changeSort"]]);
    }
    if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
    
    return gSobject;
  };
  
  return BookPresenter;
});