import { Routes } from '@angular/router';
import { PrimaryFrontComponent } from './primary-front/primary-front.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PrimaryFrontComponent },
      { path: 'temp', component: HeaderComponent },
      { path: 'temp2', component: FooterComponent },
    ],
    component: PrimaryFrontComponent
  },
  { path: '**', component: PrimaryFrontComponent },
  { path: 'login', component: InicioSesionComponent },
];
