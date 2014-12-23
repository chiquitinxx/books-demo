ul {
  books.each { book ->
    li(class: "bg-${([:] as Colorable).randomColor()} book") {
      h2 book.tittle
      p book.id
      p book.author
      p book.description
    }
  }
}
