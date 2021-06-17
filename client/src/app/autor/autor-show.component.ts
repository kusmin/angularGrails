import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Autor} from '../core/autor/autor';
import {AutorService} from '../core/autor/autor.service';

@Component({
  selector: 'autor-persist',
  templateUrl: './autor-show.component.html'
})
export class AutorShowComponent implements OnInit {

  autor = new Autor();

  constructor(private route: ActivatedRoute, private autorService: AutorService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.autorService.get(+params['id']).subscribe((autor: Autor) => {
        this.autor = autor;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.autorService.destroy(this.autor).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/autor','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
