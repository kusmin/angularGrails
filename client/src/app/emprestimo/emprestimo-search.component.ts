import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emprestimo } from '../core/emprestimo/emprestimo';
import { EmprestimoService } from '../core/emprestimo/emprestimo.service';
import { LivroService } from '../core/livro/livro.service';
import { UsuarioService } from '../core/usuario/usuario.service';

@Component({
  selector: 'emprestimo-search',
  templateUrl: './emprestimo-search.component.html',
})
export class EmprestimoSearchComponent implements OnInit {

  emprestimoSearch: Emprestimo[] = [];
  emprestimoList: Emprestimo[];

  constructor(private emprestimoService: EmprestimoService, private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private livroService: LivroService) {
  }

  ngOnInit() {
    this.emprestimoService.list().subscribe((emprestimoList: Emprestimo[]) => { this.emprestimoList = emprestimoList; });

  }
  buscar() {
    this.emprestimoService.buscar(HttpParams).subscribe((emprestimoSearch: Emprestimo[]) => {
      this.emprestimoSearch = emprestimoSearch;
    });
  }
}
