import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Livro} from '../core/livro/livro';
import {LivroService} from '../core/livro/livro.service';

@Component({
  selector: 'livro-persist',
  templateUrl: './livro-show.component.html'
})
export class LivroShowComponent implements OnInit {

  livro = new Livro();

  constructor(private route: ActivatedRoute, private livroService: LivroService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.livroService.get(+params['id']).subscribe((livro: Livro) => {
        this.livro = livro;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.livroService.destroy(this.livro).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/livro','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
