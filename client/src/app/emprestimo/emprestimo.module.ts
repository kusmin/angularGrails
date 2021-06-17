import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {EmprestimoRoutingModule} from './emprestimo-routing.module';
import {EmprestimoShowComponent} from './emprestimo-show.component';
import {EmprestimoListComponent} from './emprestimo-list.component';
import {EmprestimoPersistComponent} from './emprestimo-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    EmprestimoListComponent,
    EmprestimoPersistComponent,
    EmprestimoShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmprestimoRoutingModule,
    CoreModule
]
})
export class EmprestimoModule {}