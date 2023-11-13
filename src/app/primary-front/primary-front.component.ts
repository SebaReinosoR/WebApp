import { Component } from '@angular/core';
import { TemasService } from '../services/temas.service';
import {Temas} from '../interfaces/interfaces-temas';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-primary-front',
  templateUrl: './primary-front.component.html',
  styleUrls: ['./primary-front.component.scss']
})
export class PrimaryFrontComponent {
  
  temas:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  subtemas:any = {};
  public activeTema: Temas | null = null;
  id:any;


  constructor(private services:TemasService ,private ruta:ActivatedRoute) {
    this.ruta.params.subscribe(datos=>{
      this.id=datos["id"];
      console.log(this.id);
      
    });}




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



openPopup(tema: Temas): void {
  this.activeTema = tema;
}

closePopup(): void {
  this.activeTema = null;
}
}
