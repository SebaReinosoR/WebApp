import { Component } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  constructor(private services:PublicacionService){} /*ESTABLECER EL SERVICIO */
  publi:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  publiLink:any ={};

  ngOnInit() : void{
    this.services.getAllpubli().subscribe(publi => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.publi = publi.results;
      });
      this.services.getAllpubliLink().subscribe(publiLink => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.publiLink = publiLink.results;
      });
  }
}
