import { Component, OnInit } from '@angular/core';
import { Emprestimo } from '../core/emprestimo/emprestimo';

@Component({
  selector: 'emprestimo-search',
  templateUrl: './emprestimo-search.component.html',
})
export class EmprestimoSearchComponent implements OnInit {

  emprestimoSearch: Emprestimo[] = [];

  constructor() { }

  ngOnInit() {

  }

}
