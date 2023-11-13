import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//components
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

import { AdministradorComponent } from './administrador/administrador.component';
import { AddElementoComponent } from './add-elemento/add-elemento.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PubliVComponent } from './publicacion/publi.v/publi.v.component';
import { HttpClientModule } from '@angular/common/http';
import { SubtemaComponent } from './primary-front/subtema/subtema.component';
// services
import { CodigoService } from './services/codigo.service';
import { TemasService } from './services/temas.service';
import { PublicacionService } from './services/publicacion.service';
import { ProgramacionService } from './services/programacion.service';
import { SubtemasService } from './services/subtemas.service';
import { EncargadosService } from './services/encargados.service';
import { AdminService } from './services/admin.service';


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
    AdministradorComponent,
    AddElementoComponent,
    NavBarComponent,
    PublicacionComponent,
    PubliVComponent,
    SubtemaComponent,
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,

  ],
  providers: [
    CodigoService,
    EncargadosService,
    ProgramacionService,
    PublicacionService,
    SubtemasService,
    TemasService,
    AdminService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
