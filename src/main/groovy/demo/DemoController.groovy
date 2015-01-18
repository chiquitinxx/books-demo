package demo

import demo.model.Book
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.ModelAndView

@Controller
class DemoController {

    @Autowired
    private BookRepository bookingRepository

    @Autowired
    private SimpMessagingTemplate template

    @RequestMapping("/")
    ModelAndView index() {
        initRepositoryIfEmpty()
        return new ModelAndView("index", [last: bookingRepository.findAll().last()])
    }

    @MessageMapping("/reload")
    public void reload(String message) throws Exception {
        template.convertAndSend('/topic/reload', message)
    }

    @RequestMapping(value="/addBook", method = RequestMethod.POST)
    public @ResponseBody addBook(@RequestParam(value="author", required=true) String author,
                                 @RequestParam(value="title", required=true) String title,
                                 @RequestParam(value="year", required=true) int year) {
        Book book = new Book(author: author, title: title, year: year)
        if (book.validate()) {
            book = bookingRepository.save(book)
            template.convertAndSend('/topic/newBook', book)
        }
        return [result: book.validate() ? 'OK' : 'ERROR']
    }

    private initRepositoryIfEmpty() {
        if (bookingRepository.count() < 1) {
            bookingRepository.save(new Book(title: 'Programming Groovy 2',
                author: 'Venkat Subramaniam',year: 2013))
            bookingRepository.save(new Book(title: 'Making Java Groovy',
                    author: 'Ken Kousen',year: 2013))
            bookingRepository.save(new Book(title: 'Groovy in Action',
                    author: 'Dierk Koenig and Andrew Glover',year: 2007))
            bookingRepository.save(new Book(title: 'Groovy 2 Cookbook',
                    author: 'Andrey Adamovich and Luciano Fiandesio',year: 2013))
            bookingRepository.save(new Book(title: 'Grails in Action',
                    author: 'Peter Ledbrook and Glen Smith',year: 2014))
            bookingRepository.save(new Book(title: 'Beginning Groovy and Grails',
                    author: 'Christopher M. Judd and Joseph Faisal Nusairat',year: 2008))
            bookingRepository.save(new Book(title: 'Gradle in Action',
                    author: 'Benjamin Muschko',year: 2014))
            bookingRepository.save(new Book(title: 'Griffon in Action',
                    author: 'Andres Almiray and Danno Ferrin',year: 2012))
        }
    }
}
