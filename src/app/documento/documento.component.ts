import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../services/documentos.service';
import {Documento} from '../interfaces/interfaces-documento'

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit{

  constructor(private services:DocumentosService){} /*ESTABLECER EL SERVICIO */
  documento:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
    activeTema: Documento | null = null;


  ngOnInit() : void{
    this.services.getAlldocumento().subscribe(documento => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.documento = documento;
      });
  }

  

  openPopup(docu: Documento): void {
    this.activeTema = docu;
  }

  closePopup(): void {
    this.activeTema = null;
  }



}
