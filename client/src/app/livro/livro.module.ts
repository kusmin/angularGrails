import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LivroListComponent } from './livro-list.component';
import { LivroPersistComponent } from './livro-persist.component';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroSearchComponent } from './livro-search.component';
import { LivroShowComponent } from './livro-show.component';


@NgModule({
  declarations: [
    LivroListComponent,
    LivroPersistComponent,
    LivroShowComponent,
    LivroSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LivroRoutingModule,
    CoreModule
  ]
})
export class LivroModule { }
