div(class: 'row') {
  div(class: "small-12 medium-6 large-4 columns gridWidget", id: 'counter') {
  }
  div(class: "small-12 medium-6 large-4 columns gridWidget") {
    div(class: 'bg-red widget') {
      p 'Last book'
      h3 last.title
      p last.year
    }
  }
}
