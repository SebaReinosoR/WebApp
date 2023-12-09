import { Component } from '@angular/core';
import { SubtemasService } from 'src/app/services/subtemas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-subtema',
  templateUrl: './subtema.component.html',
  styleUrls: ['./subtema.component.scss']
})
export class SubtemaComponent {
  constructor(private services:SubtemasService, private route: ActivatedRoute){}
  subtemas:any;
  tema:any;
  id:number=-1;
  idTema:any;

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });


    this.services.getSubtemaById(this.id).subscribe(subtemas =>
      {
        this.subtemas = subtemas;
        if (this.subtemas) {
            if (this.subtemas.Body) {
              // Convierte los saltos de línea a etiquetas <br>
              this.subtemas.Body = this.convertirSaltosDeLinea(this.subtemas.Body);
            }
          }
        console.log(this.subtemas)
      });

      this.services.getTemaById(this.idTema).subscribe(tema =>
        {
          this.tema = tema;

        });


}
private convertirSaltosDeLinea(texto: string): string {
  // Convierte los saltos de línea a etiquetas <br>
  return texto.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

 captura(){
  if(this.subtemas) {
    this.idTema = this.subtemas[0].id_tema;
    console.log( this.idTema)

  }
 }


}
