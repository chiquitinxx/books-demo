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
        data.replaceAll(
            model.searchString, "<span class='bg-red'>${model.searchString}</span>"
        )
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