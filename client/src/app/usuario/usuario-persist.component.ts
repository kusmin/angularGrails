import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../core/usuario/usuario';
import {UsuarioService} from '../core/usuario/usuario.service';
import {Response} from "@angular/http";


@Component({
  selector: 'usuario-persist',
  templateUrl: './usuario-persist.component.html'
})
export class UsuarioPersistComponent implements OnInit {

  usuario = new Usuario();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
          this.create = false;
          this.usuario = usuario;
        });
      }
      
    });
  }

  save() {
    this.usuarioService.save(this.usuario).subscribe((usuario: Usuario) => {
      this.router.navigate(['/usuario', 'show', usuario.id]);
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
