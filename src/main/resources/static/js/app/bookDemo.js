define(['component/BookPresenter','component/StompClient'], function (BookPresenter,StompClient) {
gs.mc(GQueryImpl(),"onReady",[function(it) {
  var bookPresenter = BookPresenter(gs.map().add("urlBooks","/books").add("booksListSelector",".bookList").add("counterSelector","#counter"));
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