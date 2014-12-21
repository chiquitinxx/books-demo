yieldUnescaped '<!DOCTYPE html>'
html {
  head {
    title('Book Store Demo')
    link(rel: 'stylesheet', href: 'css/demo.css')
    script('data-main': 'js/demo', src: 'js/lib/require.js') {}
  }
  body {
    header(class: 'bg-black') {
      h1 'Book Store'
    }
    section {
      ul {
        books.each { book ->
          def color = demo.Colors.randomColor()
          li(class: "bg-${color} book") {
            h2 book.tittle
            p book.id
            p book.author
            p book.description
          }
        }
      }
    }
  }
}