package demo

import demo.model.Book
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class BookController {

    @Autowired
    private BookRepository bookingRepository

    @RequestMapping("/books")
    public List<Book> listBooks() {
        bookingRepository.findAll()
    }
}
