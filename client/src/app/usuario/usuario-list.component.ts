import {Component, OnInit} from '@angular/core';
import {Usuario} from '../core/usuario/usuario';
import {UsuarioService} from '../core/usuario/usuario.service';

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {

  usuarioList: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.list().subscribe((usuarioList: Usuario[]) => {
      this.usuarioList = usuarioList;
    });
  }
}
