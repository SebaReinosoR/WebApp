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
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
