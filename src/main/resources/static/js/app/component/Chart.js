define(function () {
  Chart = function() {};
  Chart.gSaT = function(target) {
    target.pieChart = function(x0, x1, x2) { return Chart.pieChart(target, x0, x1, x2); };
  };
  Chart.$init$ = function($self) {
  }
  function Chart$static$init$($static$self){
    
  };
  Chart.pieChart = function($self, selector, data) {
    new Chartist.Pie(selector, gs.toJavascript(data));
  }
  
  return Chart;
});