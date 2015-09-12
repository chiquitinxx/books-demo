define(['component/Chart','component/Counter'], function (Chart,Counter) {
  
  function BookView() {
    var gSobject = gs.inherit(gs.baseClass,'BookView');
    gSobject.clazz = { name: 'component.view.BookView', simpleName: 'BookView'};
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
    gSobject.booksCounter = null;
    gSobject.gQuery = null;
    gSobject['startCounter'] = function(counterSelector, onClick) {
      gSobject.booksCounter = Counter();
      gs.sp(gSobject.booksCounter,"onClickShow",onClick);
      return gs.mc(gSobject.booksCounter,"start",[counterSelector]);
    }
    gSobject['updateBooksNumber'] = function(number) {
      return gs.sp(gSobject.booksCounter,"number",number);
    }
    gSobject['bindBookPropertiesTo'] = function(target) {
      return gs.mc(gSobject.gQuery,"bindAllProperties",[target]);
    }
    gSobject['onAddNewBook'] = function(action) {
      return gs.mc(gSobject.gQuery,"onEvent",["#addNewBook", "click", action]);
    }
    gSobject['onClearNewBook'] = function(action) {
      return gs.mc(gs.mc(gSobject,"gQuery",["#clearBookButton"]),"click",[action]);
    }
    gSobject['onConsole'] = function(msg) {
      return gs.println(msg);
    }
    gSobject.errorMessage = function(head, message) {
      swal(head, message, "error");
    }
    if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
    
    return gSobject;
  };
  
  return BookView;
});