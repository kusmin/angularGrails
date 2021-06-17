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
class CategoriaController {

    CategoriaService categoriaService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", buscar: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond categoriaService.list(params), model:[categoriaCount: categoriaService.count()]
    }

    def show(Long id) {
        respond categoriaService.get(id)
    }

    def buscar(){
        def resultado = Categoria.withCriteria(max:10, offset: 10){
            if(params.nome){
                ilike "nome", "%${params.nome}%"
            }
            order "nome","asc"
        }
        render resultado as JSON
    }

    @Transactional
    def save(Categoria categoria) {
        if (categoria == null) {
            render status: NOT_FOUND
            return
        }
        if (categoria.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond categoria.errors
            return
        }

        try {
            categoriaService.save(categoria)
        } catch (ValidationException e) {
            respond categoria.errors
            return
        }

        respond categoria, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Categoria categoria) {
        if (categoria == null) {
            render status: NOT_FOUND
            return
        }
        if (categoria.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond categoria.errors
            return
        }

        try {
            categoriaService.save(categoria)
        } catch (ValidationException e) {
            respond categoria.errors
            return
        }

        respond categoria, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || categoriaService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
