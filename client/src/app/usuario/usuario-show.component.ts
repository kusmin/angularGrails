import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../core/usuario/usuario';
import {UsuarioService} from '../core/usuario/usuario.service';

@Component({
  selector: 'usuario-persist',
  templateUrl: './usuario-show.component.html'
})
export class UsuarioShowComponent implements OnInit {

  usuario = new Usuario();

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.usuarioService.destroy(this.usuario).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/usuario','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
