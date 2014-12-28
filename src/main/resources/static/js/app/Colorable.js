Colorable = function() {};
Colorable.gSaT = function(target) {
  target.randomColor = function(x0) { return Colorable.randomColor(target, x0); };
  target.getCOLOR_CLASSES = function(x0) { return Colorable.getCOLOR_CLASSES(target, x0); };
  target.setCOLOR_CLASSES = function(x0, x1) { return Colorable.setCOLOR_CLASSES(target, x0, x1); };
};
Colorable.$static$init$ = function($static$self) {
  return gs.mc($static$self,"component_Colorable__COLOR_CLASSES$set",[gs.list(["navy" , "blue" , "aqua" , "teal" , "olive" , "green" , "lime" , "yellow" , "orange" , "red" , "fuchsia" , "purple" , "gray" , "maroon"])]);
}
Colorable.randomColor = function($self) {
  return gs.mc($self.clazz,"component_Colorable__COLOR_CLASSES$get",[])[gs.mc(gs.random(),"nextInt",[gs.mc(gs.mc($self.clazz,"component_Colorable__COLOR_CLASSES$get",[]),"size",[])])];
}
Colorable.getCOLOR_CLASSES = function($self) { return $self.component_Colorable__cOLOR_CLASSES; }
Colorable.setCOLOR_CLASSES = function($self, value) { $self.component_Colorable__cOLOR_CLASSES = value; }
