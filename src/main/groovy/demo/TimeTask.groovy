package demo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

/**
 * Created by jorge on 25/12/14.
 */
@Configuration
@EnableScheduling
class TimeTask {

    @Autowired
    private SimpMessagingTemplate template

    @Scheduled(fixedRate = 1000L)
    public void reportCurrentTime() {
        template.convertAndSend '/topic/time', new Date().format('HH:mm:ss')
    }
}
