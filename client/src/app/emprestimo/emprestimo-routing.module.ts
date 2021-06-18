import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmprestimoListComponent } from './emprestimo-list.component';
import { EmprestimoPersistComponent } from './emprestimo-persist.component';
import { EmprestimoSearchComponent } from './emprestimo-search.component';
import { EmprestimoShowComponent } from './emprestimo-show.component';

const routes: Routes = [
  { path: 'emprestimo', redirectTo: 'emprestimo/list', pathMatch: 'full' },
  { path: 'emprestimo/list', component: EmprestimoListComponent },
  { path: 'emprestimo/create', component: EmprestimoPersistComponent },
  { path: 'emprestimo/edit/:id', component: EmprestimoPersistComponent },
  { path: 'emprestimo/show/:id', component: EmprestimoShowComponent },
  { path: 'emprestimo/search', component: EmprestimoSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprestimoRoutingModule { }