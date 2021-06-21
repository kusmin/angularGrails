import { Autor } from '../autor/autor';
import { Categoria } from '../categoria/categoria';

export class Livro {
  id: number;

  categoria: Categoria;
  autor: Autor;
  titulo: string;
  descricao: string;
  codigo: number;
  dataCadastro: any;
  capaByte: any;
  capaString: string;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('categoria')) {
        this.categoria = new Categoria(object['categoria']);
        delete object['categoria'];
      }

      if (object.hasOwnProperty('autor')) {
        this.autor = new Autor(object['autor']);
        delete object['autor'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return (this.id ? this.id : '(unsaved)') + ' : ' + this.titulo;
  }
}
