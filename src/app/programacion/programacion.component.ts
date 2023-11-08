import { Component } from '@angular/core';
import { ProgramacionService } from '../services/programacion.service';



@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent {
  constructor(private services:ProgramacionService){} /*ESTABLECER EL SERVICIO */
  progra:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  prograLink:any ={};

  ngOnInit() : void{
    this.services.getAllprogramacion().subscribe(progra => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.progra = progra.results;
      });
      this.services.getAllprograLink().subscribe(prograLink => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.prograLink = prograLink.results;
      });
  }
}
