package demo.model

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

/**
 * Created by jorge on 05/12/14.
 */
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
}
