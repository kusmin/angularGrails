import {Component, OnInit} from '@angular/core';
import {Livro} from '../core/livro/livro';
import {LivroService} from '../core/livro/livro.service';

@Component({
  selector: 'livro-list',
  templateUrl: './livro-list.component.html'
})
export class LivroListComponent implements OnInit {

  livroList: Livro[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.livroService.list().subscribe((livroList: Livro[]) => {
      this.livroList = livroList;
    });
  }
}
