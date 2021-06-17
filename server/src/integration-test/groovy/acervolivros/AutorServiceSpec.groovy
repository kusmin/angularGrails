package acervolivros

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class AutorServiceSpec extends Specification {

    AutorService autorService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Autor(...).save(flush: true, failOnError: true)
        //new Autor(...).save(flush: true, failOnError: true)
        //Autor autor = new Autor(...).save(flush: true, failOnError: true)
        //new Autor(...).save(flush: true, failOnError: true)
        //new Autor(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //autor.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        autorService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Autor> autorList = autorService.list(max: 2, offset: 2)

        then:
        autorList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        autorService.count() == 5
    }

    void "test delete"() {
        Long autorId = setupData()

        expect:
        autorService.count() == 5

        when:
        autorService.delete(autorId)
        datastore.currentSession.flush()

        then:
        autorService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Autor autor = new Autor()
        autorService.save(autor)

        then:
        autor.id != null
    }
}
