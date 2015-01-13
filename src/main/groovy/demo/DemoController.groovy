package demo

import demo.model.Book
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
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
