Visible = function() {};
Visible.gSaT = function(target) {
  Visible.$init$(target);
  target.draw = function(x0, x1, x2) { return Visible.draw(target, x0, x1, x2); };
  target.getGquery = function(x0) { return Visible.getGquery(target, x0); };
  target.setGquery = function(x0, x1) { return Visible.setGquery(target, x0, x1); };
};
Visible.$init$ = function($self) {
  return $self.component_Visible__gquery = GQueryImpl();
}
Visible.draw = function($self, html, selector) {
  if (gs.bool(selector)) {
    return gs.mc(gs.execCall($self.component_Visible__gquery, this, [selector]),"html",[gs.execStatic(HtmlBuilder,'build', this,[html])]);
  };
}
Visible.getGquery = function($self) { return $self.component_Visible__gquery; }
Visible.setGquery = function($self, value) { $self.component_Visible__gquery = value; }
