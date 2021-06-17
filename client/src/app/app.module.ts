import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorModule } from './autor/autor.module';
import { IndexComponent } from "./index/index.component";
import { NavComponent } from "./nav/nav.component";
import { NavService } from "./nav/nav.service";
import { LivroModule } from './livro/livro.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HttpModule,
    AutorModule,
    LivroModule,
    CategoriaModule,
    EmprestimoModule,
    UsuarioModule
],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
