import {Component , AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements AfterViewInit {
  constructor(private services:AdminService, private cdr: ChangeDetectorRef){} /*ESTABLECER EL SERVICIO */

  codigosAll:any;
  subtemasAll:any;
  publiAll:any;
  programacionAll:any;
  documentosAll:any;
  temasAll:any;
  encargadosAll:any;
  id_admin:number= 1;
  //CARGA IMG
  imagenEncargado: File | null = null;
  imagenPublicacion: File | null = null;
  imagenDocumentacion: File | null = null;
  imagenProgramacion: File | null = null;

  nombreArchivoProgramacion: string = '';
  nombreArchivoDocumentacion: string = '';
  nombreArchivoPublicacion: string = '';
  nombreArchivoEncargado: string = '';

  ngOnInit() : void{

    /*GET ALL */
    {
      this.services.getTemas().subscribe(temasAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
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
        this.services.getEncargados().subscribe(encargadosAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
        {
          this.encargadosAll = encargadosAll;

        });


    }


  }
  //CARGAR IMG
  onFileChange(event: Event, section: string): void {
    console.log('Se ha cambiado un archivo en la sección:', section);


    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      const file = target.files[0];
      if (file) {
        const fileName = file.name; // Obtén el nombre del archivo

        switch (section) {
          case 'programacion':
            this.imagenProgramacion = file;
            this.nombreArchivoProgramacion = fileName; // Almacena el nombre del archivo
            break;
          case 'documentacion':
            this.imagenDocumentacion = file;
            this.nombreArchivoDocumentacion = fileName;
            break;
          case 'publicacion':
            this.imagenPublicacion = file;
            this.nombreArchivoPublicacion = fileName;
            break;
          case 'encargados':
            this.imagenEncargado = file;
            this.nombreArchivoEncargado = fileName;
            break;
        }

        // Limpia el valor del input de archivo
        target.value = '';

        // Forzar la actualización de la vista
        this.cdr.detectChanges();
      }
    }

  }


  // PUT
  PutCodigo(idCodigo: number, form: NgForm): void {
    const { Nombre, Body, Link, Referencia } = form.value;
    this.services.PutCodigos(idCodigo, this.id_admin, Nombre, Body, Link, Referencia).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getCodigos().subscribe(codigosAll => {
        this.codigosAll = codigosAll;
      });
    });
  }
  PutTema(idTema:number, form:NgForm):void{
    const { Nombre} = form.value;
    this.services.PutTema(idTema,this.id_admin,Nombre).subscribe(()=>{
      alert('Modificado correctamente');
      this.services.getTemas().subscribe(temasAll => {
        this.temasAll = temasAll;
      });

    });
  }
  PutProgramacion(idProgra: number, form: NgForm): void {

    const { Nombre, Body, Link,} = form.value;
    const imagenPath = this.imagenProgramacion
    console.log(form.value);
    console.log(imagenPath);
    if (imagenPath){
      this.services.PutProgramacion(idProgra,Nombre, Body, Link, imagenPath).subscribe(() => {
        alert('Modificado correctamente');
        this.services.getProgramacion().subscribe(programacionAll => {
          this.programacionAll = programacionAll;
        });
      });
    }
    else{
      console.log('error en put')
    }

  }
  PutPublicacion(idPublicacion: number, form: NgForm): void {
    const { Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath } = form.value;
    this.services.PutPublicacion(idPublicacion, this.id_admin, Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getPublicacion().subscribe(publiAll => {
        this.publiAll = publiAll;
      });
    });
  }
  PutDocumentacion(idDocu: number, form: NgForm): void {
    const { Nombre, Body, Link, Referencia,imagenPath} = form.value;
    console.log(form.value);
    this.services.PutDocumentacion(idDocu, this.id_admin, Nombre, Body, Link, Referencia,imagenPath).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getDocumentacion().subscribe(documentosAll => {
        this.documentosAll = documentosAll;
      });
    });
  }
  PutEncargados(idEncargado:number, form:NgForm):void{
    const { Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad,imagenPath} = form.value;
    this.services.PutEncargados(idEncargado,this.id_admin,Nombre,Apellido, Carrera, Especialidad, Investigacion, Universidad,imagenPath).subscribe(()=>{
      alert('Modificado correctamente');
      this.services.getEncargados().subscribe(encargadosAll => {
        this.encargadosAll = encargadosAll;
      });

    });
  }



  // DELETE

  //Eliminar Temas

  deletetema(idtema:number): void {
    this.services.deleteTema(idtema).subscribe(() => {
      alert('Eliminado correctamente');
      this.services.getTemas().subscribe(temasAll =>
      {
        this.temasAll = temasAll;
      });
    });
  }
  //Eliminar Subtemas se realiza en componente subtema-ud

  //Eliminar Codigos

  deleteCodigo(idCodigo:number): void {
    this.services.deleteCodigos(idCodigo).subscribe(() => {
      alert('Eliminado correctamente');
      this.services.getCodigos().subscribe(codigosAll =>
        {
          this.codigosAll = codigosAll;
        });
    });
  }
   //Eliminar Publicacion

  deletePubli(idPubli:number): void {

    this.services.deletePublicacion(idPubli).subscribe(() => {
      alert('Eliminado correctamente');
      this.services.getPublicacion().subscribe(publiAll =>
      {
        this.publiAll = publiAll;
      });

    });
  }
 //Eliminar Programacion

  deleteProgra(idProgra:number): void {
  this.services.deleteProgramacion(idProgra).subscribe(() => {
    alert('Eliminado correctamente');
    this.services.getProgramacion().subscribe(programacionAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
    {
        this.programacionAll = programacionAll;
    });

  });
  }

 //Eliminar Documentacion

  deleteDocumento(idDocu:number): void {
  this.services.deleteDocumentacion(idDocu).subscribe(() => {
    alert('Eliminado correctamente');
    this.services.getDocumentacion().subscribe(documentosAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
    {
      this.documentosAll = documentosAll;
    });

  });
  }

//Eliminar Encargado

  deleteEncargado(idEncargado:number): void {
  this.services.deleteEncargado(idEncargado).subscribe(() => {
    console.log(idEncargado);
    alert('Eliminado correctamente');
    this.services.getEncargados().subscribe(encargadosAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
    {
      this.encargadosAll = encargadosAll;
    });

  });
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
