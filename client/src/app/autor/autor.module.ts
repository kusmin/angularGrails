import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AutorRoutingModule} from './autor-routing.module';
import {AutorShowComponent} from './autor-show.component';
import {AutorListComponent} from './autor-list.component';
import {AutorPersistComponent} from './autor-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AutorListComponent,
    AutorPersistComponent,
    AutorShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutorRoutingModule,
    CoreModule
]
})
export class AutorModule {}