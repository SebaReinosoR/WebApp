import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {

    user!: string;
    password!: string;

    constructor() {}

    login() {
      console.log(this.user);
      console.log(this.password);

    }

}
