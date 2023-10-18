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

const routes: Routes = [

  { path: 'Inicio', component: PrimaryFrontComponent },
  { path:'Login', component: InicioSesionComponent},
  {path:'Admin', component: AdministradorComponent},
  {path:'Add', component: AddElementoComponent},
  {path:'Codigo', component: CodigoComponent},
  {path:'Documento', component:DocumentoComponent},
  {path:'Programacion', component:ProgramacionComponent},
  {path: 'Nosotros', component: EncargadosComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
