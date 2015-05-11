define(['component/Colorable'], function (Colorable) {
Colorable = function() {};
Colorable.gSaT = function(target) {
  Colorable.$init$(target);
  target.randomColor = function(x0) { return Colorable.randomColor(target, x0); };
  target.getColorClasses = function(x0) { return Colorable.getColorClasses(target, x0); };
  target.setColorClasses = function(x0, x1) { return Colorable.setColorClasses(target, x0, x1); };
};
Colorable.$init$ = function($self) {
  return $self.component_Colorable__colorClasses = gs.list(["navy" , "blue" , "aqua" , "teal" , "olive" , "green" , "lime" , "yellow" , "orange" , "red" , "fuchsia" , "purple" , "gray" , "maroon"]);
}
function Colorable$static$init$($static$self){
  
};
Colorable.randomColor = function($self) {
  return $self.component_Colorable__colorClasses[gs.mc(gs.random(),"nextInt",[gs.mc($self.component_Colorable__colorClasses,"size",[])])];
}
Colorable.getColorClasses = function($self) { return $self.component_Colorable__colorClasses; }
Colorable.setColorClasses = function($self, value) { $self.component_Colorable__colorClasses = value; }

return Colorable;
});