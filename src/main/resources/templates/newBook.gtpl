  div(class: 'row') {
    h3 'Add new book'
  }
  div(class: 'row') {
    div(class:"small-3 columns") {
      label(for:"right-label", class:"right") {
        yield 'Title:'
      }
    }
    div(class:"small-9 columns") {
      input(type:"text", name: 'title') {}
    }
  }
  div(class: 'row') {
    div(class:"small-3 columns") {
      label(for:"right-label", class:"right") {
        yield 'Authors:'
      }
    }
    div(class:"small-9 columns") {
      input(type:"text", name: 'author') {}
    }
  }
  div(class: 'row') {
    div(class:"small-3 columns") {
      label(for:"right-label", class:"right") {
        yield 'Year:'
      }
    }
    div(class:"small-3 columns") {
      input(type:"text", name: 'year') {}
    }
    div(class:"small-6 columns") {
      a(id: 'addNewBook', href:"#", class:"button tiny secondary postfix", onclick: '') {
          yield 'Add'
      }
      a(href:"#", class:"button tiny secondary postfix", id: 'clearBookButton') {
          yield 'Clear'
      }
    }
  }