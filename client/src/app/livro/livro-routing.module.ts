import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LivroListComponent} from './livro-list.component';
import {LivroPersistComponent} from './livro-persist.component';
import {LivroShowComponent} from './livro-show.component';

const routes: Routes = [
  {path: 'livro', redirectTo: 'livro/list', pathMatch: 'full'},
  {path: 'livro/list', component: LivroListComponent},
  {path: 'livro/create', component: LivroPersistComponent},
  {path: 'livro/edit/:id', component: LivroPersistComponent},
  {path: 'livro/show/:id', component: LivroShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivroRoutingModule {}