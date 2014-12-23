ul {
  books.each { book ->
    li(class: "bg-white book") {
      h2 book.tittle
      p book.id
      p 'Author/a: ' + book.author
      p book.description
    }
  }
  li(class: "bg-black book", onClick:"console.log('Click!');") {
    h2 'Do something...'
  }
}
