import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Autor} from '../core/autor/autor';
import {AutorService} from '../core/autor/autor.service';
import {Response} from "@angular/http";


@Component({
  selector: 'autor-persist',
  templateUrl: './autor-persist.component.html'
})
export class AutorPersistComponent implements OnInit {

  autor = new Autor();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private autorService: AutorService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.autorService.get(+params['id']).subscribe((autor: Autor) => {
          this.create = false;
          this.autor = autor;
        });
      }
      
    });
  }

  save() {
    this.autorService.save(this.autor).subscribe((autor: Autor) => {
      this.router.navigate(['/autor', 'show', autor.id]);
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
