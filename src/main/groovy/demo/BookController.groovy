package demo

import demo.model.Book
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class BookController {

    @Autowired
    private BookRepository bookingRepository

    @Autowired
    private SimpMessagingTemplate template

    @RequestMapping("/books")
    public List<Book> listBooks() {
        bookingRepository.findAll()
    }
}
