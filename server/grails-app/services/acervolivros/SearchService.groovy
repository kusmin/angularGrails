package acervolivros

import grails.gorm.transactions.Transactional

@Transactional
class SearchService {

     def searcAutor(params){
        def resultado = Autor.withCriteria(max:10, offset: 10){
            if(params.nome){
                ilike "nome","%${params.nome}%"
            }
            if(params.bibliografia){
                ilike "bibliografia","%${params.bibliografia}%"
            }
            order "nome", "asc"
        }
    }

}
