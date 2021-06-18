package acervolivros

import grails.gorm.transactions.Transactional

@Transactional
class SearchEmprestimoService {

   
    def searchEmprestimo(params){
         def resultado = Emprestimo.withCriteria(max:10, offset: 10){
            if(params.status){
                eq "status","${params.status}"
            }
            livro{
                if(params.livro){
                    ilike "titulo","%${params.livro}%"
                }
            }
            usuario{
                if(params.usuario){
                    ilike "nome","%${params.usuario}%"
                }
            }
            order "livro", "asc"
        }
    }
}
