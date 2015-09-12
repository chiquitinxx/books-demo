define(['component/view/BookView','component/BookPresenter','component/StompClient'], function (BookView,BookPresenter,StompClient) {
  var gQuery = GQueryImpl();
  gs.mc(gQuery,"onReady",[function(it) {
    var bookPresenter = BookPresenter(gs.map().add("urlBooks","/books").add("booksListSelector",".bookList").add("counterSelector","#counter").add("pieChartSelector",".ct-chart").add("view",BookView(gs.map().add("gQuery",gQuery))).add("gQuery",gQuery));
    var stompClient = StompClient();
    gs.mc(stompClient,"subscribe",["/topic/reload", function(it) {
      return gs.mc(location,"reload",[]);
    }]);
    gs.mc(stompClient,"subscribe",["/topic/time", function(msg) {
      return gs.mc($("#actualTime"),"text",[gs.gp(msg,"date")]);
    }]);
    gs.mc(stompClient,"subscribe",["/topic/newBook", function(book) {
      return gs.mc(bookPresenter,"newBookFromServer",[book]);
    }]);
    gs.mc(stompClient,"start",["/demo"]);
    return gs.mc(bookPresenter,"init",[]);
  }]);
  
});