div(class: 'search') {
    p {
        yield 'Search:'
        input(id: 'marking', type: 'text')
        a(href:"#", class: "button tiny secondary", id: 'hideListBooks') {
            yield 'Hide'
        }
    }
}
div(class: 'tableSearch') {
    include template: 'bookTable.gtpl'
}