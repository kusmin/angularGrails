import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { EmprestimoListComponent } from './emprestimo-list.component';
import { EmprestimoPersistComponent } from './emprestimo-persist.component';
import { EmprestimoRoutingModule } from './emprestimo-routing.module';
import { EmprestimoSearchComponent } from './emprestimo-search.component';
import { EmprestimoShowComponent } from './emprestimo-show.component';


@NgModule({
  declarations: [
    EmprestimoListComponent,
    EmprestimoPersistComponent,
    EmprestimoShowComponent,
    EmprestimoSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmprestimoRoutingModule,
    CoreModule
  ]
})
export class EmprestimoModule { }