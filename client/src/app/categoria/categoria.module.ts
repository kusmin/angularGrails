import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CategoriaRoutingModule} from './categoria-routing.module';
import {CategoriaShowComponent} from './categoria-show.component';
import {CategoriaListComponent} from './categoria-list.component';
import {CategoriaPersistComponent} from './categoria-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaPersistComponent,
    CategoriaShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoriaRoutingModule,
    CoreModule
]
})
export class CategoriaModule {}