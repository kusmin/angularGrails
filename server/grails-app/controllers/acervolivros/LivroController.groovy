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
class LivroController {

    LivroService livroService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", buscar: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond livroService.list(params), model:[livroCount: livroService.count()]
    }

    def show(Long id) {
        respond livroService.get(id)
    }

    def tempoDeCadastro(Long id){
        def livro = livroService.get(id)
        def tempoDeCadastro = livro.dataCadastro
        LocalDate atual = LocalDate.now()
        Period periodo = Period.between(tempoDeCadastro, atual)
        def diferenca = ["${livro.titulo}" : periodo.getDays()]
        render diferenca as JSON
    }

    def buscar(){
        if(!params.titulo && !params.descricao && !params.codigo){
            def error = ["Erro": "Escolha uma opção de busca"]
            render error as JSON
            return
        }

        def resultado = Livro.withCriteria(max:10, offset: 10){
            if(params.titulo){
                ilike "titulo","%${params.titulo}%"
            }
            if(params.descricao){
                ilike "descricao","%${params.descricao}%"
            }
            if(params.codigo){
                ilike "codigo","%${params.codigo}%"
            }
            order "titulo", "asc"
        }
        render resultado as JSON
    }

    def categoriaPorLivro(){
        def categoriaPorLivro = Livro.withCriteria(){
        
        projections{
            groupProperty 'categoria.id'
            count 'categoria'
            }    
        
        }

        render categoriaPorLivro as JSON
    }


    @Transactional
    def uploadImage(FeaturedImageCommand image){
        if(image == null){
            notFound()
            return
        }
        if(image.hasErrors()){
            respond(image.errors, model:[livro: image], view: 'editImage')
        }

        Livro livro = livroDataService.update(
                image.id,
                image.version,
                image.featuredImageFile.bytes,
                image.featuredImageFile.contentType
            )
            if(image == null){
            notFound()
            return
        }
        if(livro.hasErrors()){
            respond(livro.errors, model:[livro: livro], view: 'editImage')
        }

        Locale locale = request.locale
        ​redirect(controller: "livro", action: "index")
    }

    def featuredImage(Long id) {
        Livro livro = livroDataService.get(id)
        if (!livro || livro.capaByte == null) {
            notFound()
            return
        }
        log.info "${livro.capaByte}"
        log.info "${livro.capaString}"

        render file: livro.capaByte,
            contentType: livro.capaString
    }


    @Transactional
    def save(Livro livro) {
        if (livro == null) {
            render status: NOT_FOUND
            return
        }
        if (livro.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond livro.errors
            return
        }

        try {
            livroService.save(livro)
        } catch (ValidationException e) {
            respond livro.errors
            return
        }

        respond livro, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Livro livro) {
        if (livro == null) {
            render status: NOT_FOUND
            return
        }
        if (livro.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond livro.errors
            return
        }

        try {
            livroService.save(livro)
        } catch (ValidationException e) {
            respond livro.errors
            return
        }

        respond livro, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || livroService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
