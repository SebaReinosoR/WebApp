import { Component } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../services/otros/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userIcon= faUser;
  isAuthenticated = false;

  constructor(public authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    //Se cargan los datos en caso de que el usuario tenga el token activo
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    }

    verificar(): void {
      if (!this.isAuthenticated) {
        Swal.fire({
          title: 'No estas logeado',
          text: 'Porfavor inicia sesion para entrar a tu perfil.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'green'
          });
        this.router.navigate(['/Login']);
      } else{
        this.router.navigate(['/Admin']);
      }
    }

    logout(): void {
      // Lógica para cerrar sesión
      this.authService.logout();
      this.isAuthenticated = false;
      this.router.navigate(['/Login']);
      Swal.fire({
        title: 'Cerraste sesion de forma correcta',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green'
      })
    }

}



