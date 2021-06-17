package acervolivros
import java.time.LocalDate

class Emprestimo {

    LocalDate dataCadastroEmprestimo = LocalDate.now()
    LocalDate dataDevolucao
    String status = "Emprestado"

    static belongsTo = [usuario:Usuario, livro:Livro]

    static constraints = {
        usuario nullable:false, blank:false
        livro nullable:false, blank:false
        dataCadastroEmprestimo nullable:false, blank:false
        dataDevolucao nullable:true, blank:true
        status nullable:true, blank:true, inList: ["Emprestado", "Devolvido"]
    }
}
