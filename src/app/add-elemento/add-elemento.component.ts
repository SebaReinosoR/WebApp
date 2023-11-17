import { Component , AfterViewInit } from '@angular/core';
import {AdminService}  from '../services/admin.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.scss']
})
export class AddElementoComponent implements AfterViewInit{
  
  //variables
  id_admin: number = 1;
  Nombre: string;
  Body: string;
  Link: string;
  Referencia: string;
  Fecha: Date;
  Autor:string;
  Apellido: string;
   Carrera: string;
   Especialidad: string; 
   Investigacion: string;
   Universidad: string;
  
  

   

  constructor( private services:AdminService, private formBuilder: FormBuilder) {
    this.id_tema = 0; 
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';
    this.Autor='';
    this.Fecha=new Date();
    this.Apellido='';
    this.Carrera='';
    this.Especialidad='';
    this.Investigacion=''
    this.Universidad='';
    

  // GET ALL TEMA
    this.services.getTemas().subscribe(temasAll => /*LLAMAR A LA FUNCION DEL SERVICIO , SOLICITANDO LOS DATOS */
    {
      this.temasAll = temasAll;
      
    });

  //VALIDATORS
  
  this.formTemas = this.formBuilder.group({
    titulo: ['', Validators.required],
  
  });

   }
    
   //Validators
   formTemas: FormGroup;
   
  temasAll: any[] = [];
  id_tema: number;
  mostrarAlerta: boolean = true;
  
  seleccionarTema() {
    // Verificar si se ha seleccionado un tema
    this.mostrarAlerta =  (this.id_tema === 0);
    console.log('Tema seleccionado:', this.id_tema);
    console.log(this.mostrarAlerta);
  }


 /*--------------------------------------------POST-------------------------------------------- */ 



  //SUBTEMA
  PostSubtema(): void {
    this.services.createSubtema(this.id_tema, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
         
    })
    this.id_tema = 0; 
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';
    
  }

  //TEMA

  PostTema(): void {
    this.services.createTema(this.id_admin, this.Nombre).subscribe(() => {
      alert('Agregado correctamente');
         
    })

    this.Nombre = '';
  }

  //CODIGOS

  PostCodigo(): void {
    this.services.createCodigo(this.id_admin, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
         
    })
   
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';

  }

  //Programacion

  PostProgramacion(): void {
    this.services.createProgramacion(this.id_admin, this.Nombre, this.Body, this.Link).subscribe(() => {
      console.log(this)
      alert('Agregado correctamente');
         
    })
    this.Body = '';
    this.Link = '';
    this.Nombre = '';
  }

  //Documentacion
  PostDocumentacion(): void {
    this.services.createDocumentacion(this.id_admin, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      console.log(this)
      alert('Agregado correctamente');
         
    })
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';
  }
  

  // Publicacion

  PostPublicacion(): void {
    this.services.createPublicacion(this.id_admin, this.Nombre,this.Fecha, this.Body, this.Link,this.Autor, this.Referencia).subscribe(() => {
      console.log(this)
      alert('Agregado correctamente');
         
    })

    
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';
    this.Autor='';
    this.Fecha=new Date();
    
    
  }

    // Encargados

    PostEncargados(): void {
      this.services.createEncargados(this.id_admin,this.Nombre, this.Apellido, this.Carrera, this.Especialidad, this.Investigacion, this.Universidad).subscribe(() => {
        console.log(this)
        alert('Agregado correctamente');
           
      })
    this.Nombre = ''; 
    this.Carrera='';
    this.Especialidad='';
    this.Investigacion=''
    this.Universidad='';
    this.Apellido='';

    }



    arreglo: string[] = [
      "Temas",
      "Encargados",
      "Codigos",
      "Programación",
      "Documentación",
      "Publicación",
      "Subtema",
    ];

    // Llamada a la función para cargar elementos en ngAfterViewInit
    ngAfterViewInit() {
      this.cargar_elementos();
    }

    // Función para cargar elementos en el campo <select>
    cargar_elementos() {
      // Ordena el Array Alfabéticamente
      this.arreglo.sort();

      this.addOptions("elementos", this.arreglo);
    }

    // Rutina para agregar opciones a un <select>
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




