ul {
  books.each { book ->
    li(class: "bg-purple book") {
      h2 book.tittle
      p book.id
      p 'Author\'s: ' + book.author
      p book.description
    }
  }
}
