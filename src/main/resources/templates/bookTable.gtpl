table {
    thead {
        tr {
            th(id: 'titleHead', class: "${model.sortByTitle ? 'sortedField' : ''}") {
                yield 'Title'
            }
            th 'Author'
            th 'Year'
        }
    }
    def markLetters = { data ->
        if (model.searchString) {

            def upper = data.toUpperCase()
            def toSearch = model.searchString.toUpperCase()

            def i = upper.indexOf(toSearch)
            def inc = 0
            while (i >= 0) {
                def start = i + (inc * 28)
                data = data.substring(0, start) +
                    "<span class='bg-red'>${data.substring(start, start + toSearch.size())}</span>" +
                    data.substring(start + toSearch.size())
                inc++
                i = upper.indexOf(toSearch, i + 1)
            }
        }
        data
    }
    tbody {
        def list = model.sortByTitle ? model.listBooks.sort(false, { it.title }) : model.listBooks
        list.eachWithIndex { book, i ->
            tr(class: (i % 2 == 0 ? 'bg-silver' : 'bg-white')) {
                td {
                    yieldUnescaped markLetters(book.title)
                }
                td {
                    yieldUnescaped markLetters(book.author)
                }
                td {
                    yieldUnescaped markLetters(book.year.toString())
                }
            }
        }
    }
}