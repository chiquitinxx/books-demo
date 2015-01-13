yieldUnescaped '<!DOCTYPE html>'
html {
  head {
    meta(charset: "utf-8")
    meta(name: "viewport", content: "width=device-width, initial-scale=1.0")
    title('Demo')
    link(rel: 'stylesheet', href: 'css/normalize.css')
    link(rel: 'stylesheet', href: 'css/foundation.css')
    link(href: 'http://fonts.googleapis.com/css?family=Cabin', rel:'stylesheet', type: 'text/css')
    link(rel: 'stylesheet', href: 'css/demo.css')
    script('data-main': 'js/demo', src: 'js/lib/require.js') {}
  }
  body {
    header(class: 'bg-black') {
      h1 'Grooscript templates demo'
      p(id: 'actualTime') {
        yield 'Time'
      }
    }
    div(class: 'bookList') {}
    section {
      include template: 'widgets.gtpl'
    }
  }
}