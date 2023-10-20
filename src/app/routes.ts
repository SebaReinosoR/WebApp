import { Routes } from '@angular/router';
import { PrimaryFrontComponent } from './primary-front/primary-front.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


export const routes: Routes = [

  { path: '', component: PrimaryFrontComponent },
  { path: 'login', component: InicioSesionComponent },
];
