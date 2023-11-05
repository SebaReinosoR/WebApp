import { Component } from '@angular/core';
import { TemasService } from '../services/temas.service';

@Component({
  selector: 'app-primary-front',
  templateUrl: './primary-front.component.html',
  styleUrls: ['./primary-front.component.scss']
})
export class PrimaryFrontComponent {
  constructor(private services:TemasService,){} /*ESTABLECER EL SERVICIO */
  temas:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  subtemas:any = {};


  ngOnInit() : void{
    this.services.getAlltemas().subscribe(temas => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.temas = temas.results;
      });

    this.services.getAllsubtema().subscribe(subtemas=>

      {
      this.subtemas = subtemas.results;
      console.log(this);
    });

}
}
