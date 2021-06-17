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
import java.time.*


@ReadOnly
class EmprestimoController {

    EmprestimoService emprestimoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", buscar: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond emprestimoService.list(params), model:[emprestimoCount: emprestimoService.count()]
    }

    def show(Long id) {
        respond emprestimoService.get(id)
    }

    def tempoDeEmprestimo(Long id){
        def emprestimo = emprestimoService.get(id)
        def diaPegouEmprestado = emprestimo.dataCadastroEmprestimo
        LocalDate atual = LocalDate.now()
        Period periodo = Period.between(diaPegouEmprestado, atual)
        def diferenca = ["${emprestimo.livro}": periodo.getDays()]
        render diferenca as JSON
    }

    @Transactional
    def save(Emprestimo emprestimo) {
        if (emprestimo == null) {
            render status: NOT_FOUND
            return
        }
        if (emprestimo.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond emprestimo.errors
            return
        }

        try {
            emprestimoService.save(emprestimo)
        } catch (ValidationException e) {
            respond emprestimo.errors
            return
        }

        respond emprestimo, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Emprestimo emprestimo) {
        if (emprestimo == null) {
            render status: NOT_FOUND
            return
        }
        if (emprestimo.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond emprestimo.errors
            return
        }

        try {
            emprestimoService.save(emprestimo)
        } catch (ValidationException e) {
            respond emprestimo.errors
            return
        }

        respond emprestimo, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || emprestimoService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
