import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {UsuarioRoutingModule} from './usuario-routing.module';
import {UsuarioShowComponent} from './usuario-show.component';
import {UsuarioListComponent} from './usuario-list.component';
import {UsuarioPersistComponent} from './usuario-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioPersistComponent,
    UsuarioShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRoutingModule,
    CoreModule
]
})
export class UsuarioModule {}