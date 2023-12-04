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
    this.services.getAlldocumento().subscribe(documento => {
      this.documento = documento;

      if (this.documento && this.documento.length > 0) {
        for (let i = 0; i < this.documento.length; i++) {
          if (this.documento[i].Body) {
            // Convierte los saltos de línea a etiquetas <br>
            this.documento[i].Body = this.convertirSaltosDeLinea(this.documento[i].Body);
          }
        }
      }

      console.log(this.documento);
    });

}


  private convertirSaltosDeLinea(texto: string): string {
    // Convierte los saltos de línea a etiquetas <br>
    return texto.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  openPopup(docu: Documento): void {
    this.activeTema = docu;
  }

  closePopup(): void {
    this.activeTema = null;
  }



}
