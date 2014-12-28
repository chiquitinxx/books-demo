Visible = function() {};
Visible.gSaT = function(target) {
  Visible.$init$(target);
  target.draw = function(x0) { return Visible.draw(target, x0); };
  target.getSelector = function(x0) { return Visible.getSelector(target, x0); };
  target.setSelector = function(x0, x1) { return Visible.setSelector(target, x0, x1); };
  target.getHtml = function(x0) { return Visible.getHtml(target, x0); };
  target.setHtml = function(x0, x1) { return Visible.setHtml(target, x0, x1); };
  target.getGquery = function(x0) { return Visible.getGquery(target, x0); };
  target.setGquery = function(x0, x1) { return Visible.setGquery(target, x0, x1); };
};
Visible.$init$ = function($self) {
  return $self.component_Visible__gquery = GQueryImpl();
}
Visible.draw = function($self) {
  if ($self.component_Visible__selector) {
    return gs.mc(gs.execCall($self.component_Visible__gquery, this, [$self.component_Visible__selector]),"html",[gs.execStatic(HtmlBuilder,'build', this,[$self.component_Visible__html])]);
  };
}
Visible.getSelector = function($self) { return $self.component_Visible__selector; }
Visible.setSelector = function($self, value) { $self.component_Visible__selector = value; }
Visible.getHtml = function($self) { return $self.component_Visible__html; }
Visible.setHtml = function($self, value) { $self.component_Visible__html = value; }
Visible.getGquery = function($self) { return $self.component_Visible__gquery; }
Visible.setGquery = function($self, value) { $self.component_Visible__gquery = value; }
