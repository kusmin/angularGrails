import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {UsuarioListComponent} from './usuario-list.component';
import {UsuarioPersistComponent} from './usuario-persist.component';
import {UsuarioShowComponent} from './usuario-show.component';

const routes: Routes = [
  {path: 'usuario', redirectTo: 'usuario/list', pathMatch: 'full'},
  {path: 'usuario/list', component: UsuarioListComponent},
  {path: 'usuario/create', component: UsuarioPersistComponent},
  {path: 'usuario/edit/:id', component: UsuarioPersistComponent},
  {path: 'usuario/show/:id', component: UsuarioShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {}