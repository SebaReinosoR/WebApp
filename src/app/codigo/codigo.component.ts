import { Component} from '@angular/core';
import { CodigoService } from '../services/codigo.service';



@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent {
  constructor(private services:CodigoService,){} /*ESTABLECER EL SERVICIO */
  temas:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  subtemas:any = {};


  ngOnInit() : void{
    this.services.getCodigo().subscribe(temas => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.temas = temas.results;
      });

    this.services.getSubtema().subscribe(subtemas=>

      {
      this.subtemas = subtemas.results;
      console.log(this);
    });

  }
}
