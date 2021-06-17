import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AutorService } from './autor/autor.service';
import { LivroService } from './livro/livro.service';
import { CategoriaService } from './categoria/categoria.service';
import { EmprestimoService } from './emprestimo/emprestimo.service';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    AutorService,
    LivroService,
    CategoriaService,
    EmprestimoService,
    UsuarioService
]
})
export class CoreModule {}