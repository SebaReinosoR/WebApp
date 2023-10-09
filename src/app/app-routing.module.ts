import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimaryFrontComponent } from './primary-front/primary-front.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AddElementoComponent } from './add-elemento/add-elemento.component';

const routes: Routes = [

  { path: '', component: PrimaryFrontComponent },
  { path:'login', component: InicioSesionComponent},
  {path:'admin', component: AdministradorComponent},
  {path:'add', component: AddElementoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
