import { Component } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
   /*ESTABLECER EL SERVICIO */
  publi:any;    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  publiLink:any;
  id:number=-1;


  constructor(private services:PublicacionService ,private ruta:ActivatedRoute) {}

  ngOnInit() : void{
    this.services.getAllpubli().subscribe(publi => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.publi = publi;
      });
    

      }

}



