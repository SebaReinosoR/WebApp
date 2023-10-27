import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryFrontComponent } from './primary-front/primary-front.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { CodigoComponent } from './codigo/codigo.component';
import { DocumentoComponent } from './documento/documento.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { SubtemaComponent } from './subtema/subtema.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AddElementoComponent } from './add-elemento/add-elemento.component';
import { ModifyElementoComponent } from './modify-elemento/modify-elemento.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PubliVComponent } from './publicacion/publi.v/publi.v.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryFrontComponent,
    HeaderComponent,
    FooterComponent,
    InicioSesionComponent,
    CodigoComponent,
    DocumentoComponent,
    ProgramacionComponent,
    EncargadosComponent,
    SubtemaComponent,
    AdministradorComponent,
    AddElementoComponent,
    ModifyElementoComponent,
    NavBarComponent,
    PublicacionComponent,
    PubliVComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
