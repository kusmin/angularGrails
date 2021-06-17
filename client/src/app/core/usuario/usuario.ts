

export class Usuario {
  id: number;

  nome: string;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return this.nome;
  }
}
