import { Component } from '@angular/core';
import { ProgramacionService } from '../services/programacion.service';



@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent {
  constructor(private services:ProgramacionService){} /*ESTABLECER EL SERVICIO */
  progra:any = {};    /*CREAR VARIABLE PARA LA LISTA DE ELEMENTOS*/
  prograLink:any ={};

  ngOnInit() : void{
    this.services.getAllprogramacion().subscribe(progra => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.progra = progra;
        if (this.progra && this.progra.length > 0) {
          for (let i = 0; i < this.progra.length; i++) {
            if (this.progra[i].Body) {
              // Convierte los saltos de línea a etiquetas <br>
              this.progra[i].Body = this.convertirSaltosDeLinea(this.progra[i].Body);
            }
          }
        }

        console.log(this.progra);
      });

  }

    private convertirSaltosDeLinea(texto: string): string {
      // Convierte los saltos de línea a etiquetas <br>
      return texto.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

}
