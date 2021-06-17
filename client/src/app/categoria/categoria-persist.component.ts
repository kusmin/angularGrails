import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Categoria} from '../core/categoria/categoria';
import {CategoriaService} from '../core/categoria/categoria.service';
import {Response} from "@angular/http";


@Component({
  selector: 'categoria-persist',
  templateUrl: './categoria-persist.component.html'
})
export class CategoriaPersistComponent implements OnInit {

  categoria = new Categoria();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.categoriaService.get(+params['id']).subscribe((categoria: Categoria) => {
          this.create = false;
          this.categoria = categoria;
        });
      }
      
    });
  }

  save() {
    this.categoriaService.save(this.categoria).subscribe((categoria: Categoria) => {
      this.router.navigate(['/categoria', 'show', categoria.id]);
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
