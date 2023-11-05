import { Component, OnInit} from '@angular/core';
import { EncargadosService } from '../services/encargados.service'; /* LLAMAR AL SERVICIO PRINCIPAL DEL COMPONENTE */
@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.scss']
})

export class EncargadosComponent {

  lista:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/

  constructor(private services:EncargadosService){ /*ESTABLECER EL SERVICIO */


  }
  ngOnInit() : void{
    this.services.getAllencargados().subscribe(lista => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.lista = lista.results;
        console.log(this)
      });

  }
}
