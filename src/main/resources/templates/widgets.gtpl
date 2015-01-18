div(class: 'row') {
  div(class: "small-12 medium-6 large-4 columns gridWidget", id: 'counter') {
  }
  div(class: "small-12 medium-6 large-4 columns gridWidget") {
    div(class: 'bg-red widget', id: 'lastBook') {
      include template: 'lastBook.gtpl'
    }
  }
  div(class: "small-12 medium-6 large-4 columns gridWidget") {
    div(id: 'newBook', class: 'bg-blue widget') {
      include template: 'newBook.gtpl'
    }
  }
  div(class: "small-12 medium-6 large-4 columns") {
    div(class: 'ct-chart ct-perfect-fourth') {}
  }
}
