package acervolivros

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class UsuarioServiceSpec extends Specification {

    UsuarioService usuarioService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Usuario(...).save(flush: true, failOnError: true)
        //new Usuario(...).save(flush: true, failOnError: true)
        //Usuario usuario = new Usuario(...).save(flush: true, failOnError: true)
        //new Usuario(...).save(flush: true, failOnError: true)
        //new Usuario(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //usuario.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        usuarioService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Usuario> usuarioList = usuarioService.list(max: 2, offset: 2)

        then:
        usuarioList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        usuarioService.count() == 5
    }

    void "test delete"() {
        Long usuarioId = setupData()

        expect:
        usuarioService.count() == 5

        when:
        usuarioService.delete(usuarioId)
        datastore.currentSession.flush()

        then:
        usuarioService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Usuario usuario = new Usuario()
        usuarioService.save(usuario)

        then:
        usuario.id != null
    }
}
