import {Component , AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements AfterViewInit {
  constructor(private services:AdminService, private cdr: ChangeDetectorRef ,private sanitizer: DomSanitizer){} /*ESTABLECER EL SERVICIO */

  codigosAll:any;
  subtemasAll:any;
  publiAll:any;
  programacionAll:any;
  documentosAll:any;
  temasAll:any;
  encargadosAll:any;
  id_admin:number= 1;
  //CARGA IMG

  imagen: File | null = null;

  //Previsualizar IMG

  Preview:any;

  nombreArchivoProgramacion:any
  nombreArchivoDocumentacion: string = '';
  nombreArchivoPublicacion: string = '';
  nombreArchivoEncargado: string = '';

  private subscriptions = new Subscription();
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



  // PUT
  PutProgramacion(idProgra: number, form: NgForm): void {
    const { Nombre, Body, Link } = form.value;
    const imagenPath = this.imagen;

    if (!imagenPath) {
      alert('Por favor, selecciona una imagen para realizar la modificación.');
      return; 
    }
    console.log(imagenPath);
  
    this.subscriptions.add(
      this.services.PutProgramacion(idProgra, Nombre, Body, Link, imagenPath).subscribe(() => {
        console.log(idProgra, Nombre, Body, Link, imagenPath)
        alert('Modificado correctamente');
        this.services.getProgramacion().subscribe(programacionAll => {
          this.programacionAll = programacionAll;
        });
      })
    );
  }


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

  PutPublicacion(idPublicacion: number, form: NgForm): void {
    const { Nombre,Fecha,Body,Referencia,Autor, Link} = form.value;
    const imagenPath = this.imagen; 
    if (!imagenPath) {
      alert('Por favor, selecciona una imagen para realizar la modificación.');
      return;
    } 
    this.subscriptions.add( 
    this.services.PutPublicacion(idPublicacion, this.id_admin, Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getPublicacion().subscribe(publiAll => {
        this.publiAll = publiAll;
      });
    })
    )
  }
  PutDocumentacion(idDocu: number, form: NgForm): void {
    const { Nombre, Body, Link, Referencia} = form.value;
    const imagenPath = this.imagen;  
    if (!imagenPath) {
      alert('Por favor, selecciona una imagen para realizar la modificación.');
      return;
    }  
    this.subscriptions.add(
    this.services.PutDocumentacion(idDocu, this.id_admin, Nombre, Body, Link, Referencia,imagenPath).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getDocumentacion().subscribe(documentosAll => {
        this.documentosAll = documentosAll;
      });
    })
    )
  }




  PutEncargados(idEncargado:number, form:NgForm):void{
    const { Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad} = form.value;
    const imagenPath = this.imagen;
    if (!imagenPath) {
      alert('Por favor, selecciona una imagen para realizar la modificación.');
      return;
    }
    this.subscriptions.add(
      this.services.PutEncargados(idEncargado,this.id_admin,Nombre,Apellido, Carrera, Especialidad, Investigacion, Universidad,imagenPath).subscribe(()=>{
        alert('Modificado correctamente');
        this.services.getEncargados().subscribe(encargadosAll => {
          this.encargadosAll = encargadosAll;
        });

      })
    );
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


    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();

        reader.readAsDataURL($event);

        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };

        reader.onerror = error => {
          reject({
            base: null
          });
        };

      } catch (e) {
        reject({
          base: null
        });
      }
    });
    capturarFile(event:any): any {
      const archivoCapturado = event.target.files[0]
  
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.Preview = imagen.base;
        console.log(imagen);
  
      })
      this.imagen = archivoCapturado;
      console.log(this.imagen)
    }
  
    clearImage(): any {
      this.Preview = '';
      this.imagen = null;
    }


}



