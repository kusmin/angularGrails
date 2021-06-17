import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {CategoriaListComponent} from './categoria-list.component';
import {CategoriaPersistComponent} from './categoria-persist.component';
import {CategoriaShowComponent} from './categoria-show.component';

const routes: Routes = [
  {path: 'categoria', redirectTo: 'categoria/list', pathMatch: 'full'},
  {path: 'categoria/list', component: CategoriaListComponent},
  {path: 'categoria/create', component: CategoriaPersistComponent},
  {path: 'categoria/edit/:id', component: CategoriaPersistComponent},
  {path: 'categoria/show/:id', component: CategoriaShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule {}