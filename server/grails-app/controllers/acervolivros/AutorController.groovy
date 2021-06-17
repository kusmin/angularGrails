package acervolivros

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

import grails.converters.JSON


@ReadOnly
class AutorController {

    AutorService autorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", buscar: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond autorService.list(params), model:[autorCount: autorService.count()]
    }

    def show(Long id) {
        respond autorService.get(id)
    }

    def buscar(){
        if(!params.nome && !params.bibliografia){
            def error = ["Erro": "Escolha uma opção de busca"]
            render error as JSON
            return
        }

        def resultado = Autor.withCriteria(max:10, offset: 10){
            if(params.nome){
                ilike "nome","%${params.nome}%"
            }
            if(params.bibliografia){
                ilike "bibliografia","%${params.bibliografia}%"
            }
            order "nome", "asc"
        }
        render resultado as JSON
    }

    @Transactional
    def save(Autor autor) {
        if (autor == null) {
            render status: NOT_FOUND
            return
        }
        if (autor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond autor.errors
            return
        }

        try {
            autorService.save(autor)
        } catch (ValidationException e) {
            respond autor.errors
            return
        }

        respond autor, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Autor autor) {
        if (autor == null) {
            render status: NOT_FOUND
            return
        }
        if (autor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond autor.errors
            return
        }

        try {
            autorService.save(autor)
        } catch (ValidationException e) {
            respond autor.errors
            return
        }

        respond autor, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || autorService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
