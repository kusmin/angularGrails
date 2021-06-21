import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Emprestimo } from '../core/emprestimo/emprestimo';
import { EmprestimoService } from '../core/emprestimo/emprestimo.service';
import { Livro } from '../core/livro/livro';
import { LivroService } from '../core/livro/livro.service';
import { Usuario } from '../core/usuario/usuario';
import { UsuarioService } from '../core/usuario/usuario.service';

@Component({
  selector: 'emprestimo-persist',
  templateUrl: './emprestimo-persist.component.html'
})
export class EmprestimoPersistComponent implements OnInit {

  emprestimo = new Emprestimo();
  create = true;
  errors: any[];
  usuarioList: Usuario[];
  livroList: Livro[];

  constructor(private route: ActivatedRoute, private emprestimoService: EmprestimoService, private router: Router, private usuarioService: UsuarioService, private livroService: LivroService) { }

  ngOnInit() {
    this.usuarioService.list().subscribe((usuarioList: Usuario[]) => { this.usuarioList = usuarioList; });
    this.livroService.list().subscribe((livroList: Livro[]) => { this.livroList = livroList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.emprestimoService.get(+params['id']).subscribe((emprestimo: Emprestimo) => {
          this.create = false;
          this.emprestimo = emprestimo;
        });
      }

      if (params.hasOwnProperty('usuarioId')) {
        this.emprestimo.usuario = new Usuario({ id: params['usuarioId'] })
      }


      if (params.hasOwnProperty('livroId')) {
        this.emprestimo.livro = new Livro({ id: params['livroId'] })
      }

    });
  }

  save() {
    this.emprestimoService.save(this.emprestimo).subscribe((emprestimo: Emprestimo) => {
      this.router.navigate(['/emprestimo', 'show', emprestimo.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
