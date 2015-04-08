package demo.model

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@ToString
@EqualsAndHashCode(includes = ['title', 'author', 'year'])
class Book {
    BigInteger id
    String title
    String author
    int year

    boolean validate() {
        title && author && year > 1900
    }

    String errorMessage() {
        def messages = []
        if (!title) messages << 'Forgot title'
        if (!author) messages << 'Author missing'
        if (year <= 1900) messages << 'At least XX century'
        messages.join('\n')
    }
}
