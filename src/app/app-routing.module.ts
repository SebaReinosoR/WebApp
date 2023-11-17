import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimaryFrontComponent } from './primary-front/primary-front.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AddElementoComponent } from './add-elemento/add-elemento.component';
import { CodigoComponent } from './codigo/codigo.component';
import { DocumentoComponent } from './documento/documento.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PubliVComponent}from './publicacion/publi.v/publi.v.component';
import { SubtemaComponent } from './primary-front/subtema/subtema.component';
import { PermisoRutasService } from './services/otros/permiso-rutas.service';
import {SubtemaUDComponent} from './administrador/subtema-ud/subtema-ud.component';


const routes: Routes = [

  {path: 'inicio', component: PrimaryFrontComponent },
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'Login', component: InicioSesionComponent},
  {path:'Admin', component: AdministradorComponent},  /*canActivate:[PermisoRutasService] */
  {path:'Add', component: AddElementoComponent},/*canActivate:[PermisoRutasService] */
  {path:'Codigo', component: CodigoComponent},
  {path:'Documento', component:DocumentoComponent},
  {path:'Programacion', component:ProgramacionComponent},
  {path: 'Nosotros', component: EncargadosComponent},
  {path :'Publicacion',component:PublicacionComponent},

  //rutas ID
  {path : 'PubliOpen/:id',component:PubliVComponent},
  {path : 'Subtema/:id', component:SubtemaComponent},
  {path : 'Admin/SubtemaUD/:id',component:SubtemaUDComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
