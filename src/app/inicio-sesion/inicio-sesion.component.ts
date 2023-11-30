import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import {PermisoRutasService} from '../services/otros/permiso-rutas.service'
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

public myform!:FormGroup;
ping:boolean=false;

constructor(private fb:FormBuilder, private loginInit:LoginService, private routerprd:Router, private autenticacion:PermisoRutasService, private authService: AuthService, private location: Location){}


ngOnInit(): void {
  this.myform = this.createMyForm();

}

private createMyForm():FormGroup{
  return this.fb.group({
    usuario:['',[Validators.required]],
    password:['', Validators.required]
  });
}

public submitForm(){
  if(this.myform.invalid){
    Object.values(this.myform.controls).forEach(control=>{
      control.markAllAsTouched();
    });
    return;
}

this.loginInit.postLogin(this.myform.value).subscribe(
  (administrador) => {
    const token = 'token_auth'
    this.authService.login(token);
    if (administrador && administrador.length > 0) {
      
      this.autenticacion.autenticacion(true);
      this.routerprd.navigateByUrl("/Admin");
    } else {
      // Usuario o contraseña inválido
      Swal.fire({
        title: 'Error al iniciar sesión',
        text: 'Usuario y/o contraseñas erroneos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green'
        })
    }
  },
  (error) => {
    // Manejar errores de la solicitud HTTP
    console.error('Error en la solicitud HTTP:', error);
    alert("Error interno del servidor");
    
  }
);

}

public get f():any{
  return this.myform.controls;
}

}
