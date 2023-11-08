import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';


@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit{

  constructor(private services:DocumentosService){} /*ESTABLECER EL SERVICIO */
  documento:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/

  ngOnInit() : void{
    this.services.getAlldocumento().subscribe(documento => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.documento = documento.results;
      });
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }




}
