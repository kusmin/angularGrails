package acervolivros

import grails.gorm.services.Service

@Service(Livro)
interface LivroService {

    Livro get(Serializable id)

    List<Livro> list(Map args)

    Long count()

    Livro delete(Serializable id)

    Livro save(Livro livro)

}
