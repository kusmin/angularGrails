import { Component, OnInit } from '@angular/core';
import { Livro } from '../core/livro/livro';
import { LivroService } from '../core/livro/livro.service';

@Component({
  selector: 'livro-search',
  templateUrl: './livro-search.component.html'
})
export class LivroSearchComponent implements OnInit {

  livroSearch: Livro[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    // this.livroService.search().subscribe((livroSearch: Livro[]) => {
    //   this.livroSearch = livroSearch;
    // });
  }
}

