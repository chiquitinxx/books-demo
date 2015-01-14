package demo

import demo.model.Book
import org.springframework.data.mongodb.repository.MongoRepository

interface BookRepository extends MongoRepository<Book, BigInteger> {
}
