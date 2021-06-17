import {Component, OnInit} from '@angular/core';
import {Emprestimo} from '../core/emprestimo/emprestimo';
import {EmprestimoService} from '../core/emprestimo/emprestimo.service';

@Component({
  selector: 'emprestimo-list',
  templateUrl: './emprestimo-list.component.html'
})
export class EmprestimoListComponent implements OnInit {

  emprestimoList: Emprestimo[] = [];

  constructor(private emprestimoService: EmprestimoService) { }

  ngOnInit() {
    this.emprestimoService.list().subscribe((emprestimoList: Emprestimo[]) => {
      this.emprestimoList = emprestimoList;
    });
  }
}
