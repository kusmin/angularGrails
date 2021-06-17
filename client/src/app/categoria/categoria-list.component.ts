import {Component, OnInit} from '@angular/core';
import {Categoria} from '../core/categoria/categoria';
import {CategoriaService} from '../core/categoria/categoria.service';

@Component({
  selector: 'categoria-list',
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent implements OnInit {

  categoriaList: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.list().subscribe((categoriaList: Categoria[]) => {
      this.categoriaList = categoriaList;
    });
  }
}
