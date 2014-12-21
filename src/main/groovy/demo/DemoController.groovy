package demo

import demo.model.Book
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

@Controller
class DemoController {

    @Autowired
    private BookRepository bookingRepository

    @RequestMapping("/")
    ModelAndView index() {
        initRepositoryIfEmpty()
        return new ModelAndView("index", [books: bookingRepository.findAll()])
    }

    private initRepositoryIfEmpty() {
        if (bookingRepository.count() < 1) {
            8.times {
                bookingRepository.save(new Book(
                        tittle: 'Lorem ipsum dolor',
                        author: 'Lorem ipsum',
                        description: '''Lorem ipsum dolor sit amet, ei pro nobis affert, clita delectus quaestio mea et. Eam bonorum suscipit senserit te, ex causae vituperatoribus his. Est case aliquip ei, in eos mucius corpora pertinax. Ius in inimicus urbanitas conceptam, at sanctus sapientem vix, debitis tractatos an mea.'''))
            }
        }
    }
}
