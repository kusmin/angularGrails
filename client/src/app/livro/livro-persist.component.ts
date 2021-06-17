import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Livro} from '../core/livro/livro';
import {LivroService} from '../core/livro/livro.service';
import {Response} from "@angular/http";
import { CategoriaService } from '../core/categoria/categoria.service';
import { Categoria } from '../core/categoria/categoria';
import { AutorService } from '../core/autor/autor.service';
import { Autor } from '../core/autor/autor';

@Component({
  selector: 'livro-persist',
  templateUrl: './livro-persist.component.html'
})
export class LivroPersistComponent implements OnInit {

  livro = new Livro();
  create = true;
  errors: any[];
  categoriaList: Categoria[];
  autorList: Autor[];

  constructor(private route: ActivatedRoute, private livroService: LivroService, private router: Router, private categoriaService: CategoriaService, private autorService: AutorService) {}

  ngOnInit() {
    this.categoriaService.list().subscribe((categoriaList: Categoria[]) => { this.categoriaList = categoriaList; });
    this.autorService.list().subscribe((autorList: Autor[]) => { this.autorList = autorList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.livroService.get(+params['id']).subscribe((livro: Livro) => {
          this.create = false;
          this.livro = livro;
        });
      }
      
      if (params.hasOwnProperty('categoriaId')) {
        this.livro.categoria = new Categoria({id: params['categoriaId']})
      }

      
      if (params.hasOwnProperty('autorId')) {
        this.livro.autor = new Autor({id: params['autorId']})
      }

    });
  }

  save() {
    this.livroService.save(this.livro).subscribe((livro: Livro) => {
      this.router.navigate(['/livro', 'show', livro.id]);
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
