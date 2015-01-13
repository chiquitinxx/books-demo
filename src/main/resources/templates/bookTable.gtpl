table {
    thead {
        tr {
            th 'Title'
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
        model.listBooks.eachWithIndex { book, i ->
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