import { Component } from '@angular/core';

@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.scss']
})
export class AddElementoComponent {


  constructor(){

    let arreglo : string[] = [

      "Temas",
      "Encargados",
      "Codigos",
      "BP",
      "documentacion",
      "publicacion",
      "Subtema"
    ];

  }


}
