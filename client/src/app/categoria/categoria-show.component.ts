import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Categoria} from '../core/categoria/categoria';
import {CategoriaService} from '../core/categoria/categoria.service';

@Component({
  selector: 'categoria-persist',
  templateUrl: './categoria-show.component.html'
})
export class CategoriaShowComponent implements OnInit {

  categoria = new Categoria();

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoriaService.get(+params['id']).subscribe((categoria: Categoria) => {
        this.categoria = categoria;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.categoriaService.destroy(this.categoria).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/categoria','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
