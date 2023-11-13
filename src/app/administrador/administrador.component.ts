import {Component , AfterViewInit  } from '@angular/core';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements AfterViewInit {
  constructor(private services:AdminService){} /*ESTABLECER EL SERVICIO */

  codigosAll:any = {};
  subtemasAll:any ={};
  publiAll:any = {};
  programacionAll:any = {};
  documentosAll:any = {};
  temasAll:any = {};


  ngOnInit() : void{

    /*GET ALL */
    {
      this.services.getDocumentacion().subscribe(temasAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
      {
        this.temasAll = temasAll;
      });
  
      this.services.getCodigos().subscribe(codigosAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.codigosAll = codigosAll;
        });
  
        this.services.getSubtemas().subscribe(subtemasAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.subtemasAll = subtemasAll;
        });
  
        this.services.getPublicacion().subscribe(publiAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.publiAll = publiAll;
        });
  
        this.services.getProgramacion().subscribe(programacionAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.programacionAll = programacionAll;
        });
  
        this.services.getDocumentacion().subscribe(documentosAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.documentosAll = documentosAll;
        });
  
  
    }
   

  }
 /*CONTROL DE SELECT */

  arreglo: string[] = [
    "Temas",
    "Encargados",
    "Codigos",
    "Programación",
    "Documentación",
    "Publicación",
    
  ];

  ngAfterViewInit() {
    this.cargar_elementos();
  }

  cargar_elementos() {
    // Ordena el Array Alfabéticamente
    this.arreglo.sort();

    this.addOptions("elementos", this.arreglo);
  }

  addOptions(domElement: string, arreglo: string[]) {
    var select = document.querySelector(`select[name="${domElement}"]`) as HTMLSelectElement;

    for (let value of arreglo) {
      var option = document.createElement("option");
      option.text = value;
      select.add(option);
    }

  }

  opcionSeleccionada: string = '0'; // Opción predeterminada
  mostrarTemas: boolean = false;
  mostrarEncargados: boolean = false;
  mostrarCodigos: boolean = false;
  mostrarProgramacion: boolean = false;
  mostrarDocumentacion: boolean = false;
  mostrarPublicacion: boolean = false;
  mostrarSubtema: boolean = false;

  onOptionChange(event: any) {
    this.opcionSeleccionada = event.target.value;

      // Establece las condiciones para mostrar/ocultar campos según la opción seleccionada
      this.mostrarTemas = this.opcionSeleccionada === 'Temas';
      this.mostrarEncargados= this.opcionSeleccionada === 'Encargados';
      this.mostrarCodigos = this.opcionSeleccionada === 'Codigos';
      this.mostrarProgramacion = this.opcionSeleccionada === 'Programación';
      this.mostrarDocumentacion = this.opcionSeleccionada === 'Documentación';
      this.mostrarPublicacion = this.opcionSeleccionada === 'Publicación';
      this.mostrarSubtema = this.opcionSeleccionada === 'Subtema';
      // Define condiciones para otros campos aquí
    };




}
