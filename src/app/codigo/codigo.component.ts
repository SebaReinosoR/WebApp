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

    });



  }
  public hidden(item: any,tema: any): boolean {
    this.ping =item!== tema;

    return this.ping;
  }
}
