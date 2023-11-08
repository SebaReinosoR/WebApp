import { Component } from '@angular/core';
import { SubtemasService } from 'src/app/services/subtemas.service';


@Component({
  selector: 'app-subtema',
  templateUrl: './subtema.component.html',
  styleUrls: ['./subtema.component.scss']
})
export class SubtemaComponent {
  constructor(private services:SubtemasService){} /*ESTABLECER EL SERVICIO */
  subtemas:any = {};


  ngOnInit() : void{

    this.services.getAllsubtema().subscribe(subtemas=>  /*verificar si es 100% necesario esto , ya que solo es una muestra mas explicita con lo que ya existe*/
    {
      this.subtemas = subtemas.results;
      console.log(this);
    });

}

}
