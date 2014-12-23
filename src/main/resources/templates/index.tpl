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
      include template: 'bookList.gtpl'
    }
  }
}