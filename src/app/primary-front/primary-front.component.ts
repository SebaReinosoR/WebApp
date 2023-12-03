import { Component } from '@angular/core';
import { TemasService } from '../services/temas.service';
import {ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-primary-front',
  templateUrl: './primary-front.component.html',
  styleUrls: ['./primary-front.component.scss']
})
export class PrimaryFrontComponent {

  temas:any;    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  subtemas:any;
  id:any;
  subtemasID:any;

  constructor(private services:TemasService ,private ruta:ActivatedRoute) {}

  ngOnInit() : void{
    this.services.getAlltemas().subscribe(temas => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.temas = temas;
      });

    this.services.getAllsubtema().subscribe(subtemas=>
      {
      this.subtemas = subtemas;
      });


}

captura(id:number):any{
  this.services.getSubtemaById(id).subscribe(subtemasID =>
    {
      this.subtemasID= subtemasID;

    });


}

}
