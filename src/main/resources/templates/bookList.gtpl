div(class: 'search') {
    p {
        yield 'Search:'
        input(id: 'marking', type: 'text')
        a(href:"#", class: "button tiny secondary", onclick: 'bookPresenter.hideBooks()') {
            yield 'Hide'
        }
    }
}
div(class: 'tableSearch') {
    include template: 'bookTable.gtpl'
}