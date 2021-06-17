import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorListComponent } from './autor-list.component';
import { AutorPersistComponent } from './autor-persist.component';
import { AutorShowComponent } from './autor-show.component';

const routes: Routes = [
  { path: 'autor', redirectTo: 'autor/list', pathMatch: 'full' },
  { path: 'autor/list', component: AutorListComponent },
  { path: 'autor/create', component: AutorPersistComponent },
  { path: 'autor/edit/:id', component: AutorPersistComponent },
  { path: 'autor/show/:id', component: AutorShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorRoutingModule { }
