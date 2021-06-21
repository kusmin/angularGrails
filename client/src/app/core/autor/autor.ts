

export class Autor {
  id: number;

  nome: string;
  bibliografia: string;
  fotoByte: any;
  fotoString: string;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return (this.id ? this.id : '(unsaved)') + ' : ' + this.nome;
  }
}
