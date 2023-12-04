import { Component, OnInit} from '@angular/core';
import { CodigoService } from '../services/codigo.service';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';



@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent implements OnInit {

  codigo:any = [];

  ping:boolean=false;

  constructor(private services:CodigoService){

  } /*ESTABLECER EL SERVICIO */
  ngOnInit(): void {
    this.services.getCodigo().subscribe((codigo) => {
      this.codigo = codigo;
      if (this.codigo && this.codigo.length > 0) {
        for (let i = 0; i < this.codigo.length; i++) {
          if (this.codigo[i].Body) {
            // Convierte los saltos de línea a etiquetas <br>
            this.codigo[i].Body = this.convertirSaltosDeLinea(this.codigo[i].Body);
          }
        }
      }
    });
  }
  private convertirSaltosDeLinea(texto: string): string {
    // Convierte los saltos de línea a etiquetas <br>
    return texto.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  public hidden(item: any,tema: any): boolean {
    this.ping =item!== tema;

    return this.ping;
  }
}
