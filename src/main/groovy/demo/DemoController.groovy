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
        return new ModelAndView("index", [books: bookingRepository.findAll()])
    }

    //@SendTo("/topic/greetings")
    @MessageMapping("/hello")
    public void reload(String message) throws Exception {
        //Thread.sleep(3000); // simulated delay
        //return new Greeting("Hello, " + message.getName() + "!");
        println '** Reload from ** '+message
        template.convertAndSend('/topic/reload', 'templates')
    }

    private initRepositoryIfEmpty() {
        if (bookingRepository.count() < 1) {
            8.times {
                bookingRepository.save(new Book(
                    tittle: 'Lorem ipsum dolor',
                    author: 'Lorem ipsum',
                    description: 'Lorem ipsum dolor sit amet...'))
            }
        }
    }
}
