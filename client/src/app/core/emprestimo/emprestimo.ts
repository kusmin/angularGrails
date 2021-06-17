import { Usuario } from '../usuario/usuario';
import { Livro } from '../livro/livro';

export class Emprestimo {
  id: number;

  usuario: Usuario;
  livro: Livro;
  dataCadastroEmprestimo: any;
  dataDevolucao: any;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('usuario')) {
        this.usuario = new Usuario(object['usuario']);
        delete object['usuario'];
      }
      
      if (object.hasOwnProperty('livro')) {
        this.livro = new Livro(object['livro']);
        delete object['livro'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'acervolivros.Emprestimo : ' + (this.id ? this.id : '(unsaved)');
  }
}