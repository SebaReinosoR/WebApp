import { Component , OnDestroy, AfterViewInit, OnInit , ChangeDetectorRef} from '@angular/core';
import {AdminService}  from '../services/admin.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/internal/operators/finalize';import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.scss']
})
export class AddElementoComponent implements AfterViewInit, OnDestroy, OnInit {

  //variables
  nombreArchivoProgramacion: string = '';
  nombreArchivoDocumentacion: string = '';
  nombreArchivoPublicacion: string = '';
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
  imagenEncargado: File | null = null;
  imagenPublicacion: File | null = null;
  imagenDocumentacion: File | null = null;
  imagenProgramacion: File | null = null;
  private subscriptions = new Subscription();
  id_tema: number;
  temasAll: any[]=[];

  constructor( private services:AdminService, private fb: FormBuilder,private cdr: ChangeDetectorRef) {
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
  this.services.getTemas().subscribe(temasAll =>
    {
      this.temasAll = temasAll;
    });

  }

  ngOnInit() {
    this.loadFormDataFromLocalStorage();
    this.myformTema = this.createmyformTema(); // CREAR LA VALIDACION TEMA
  }

  saveFormDataToLocalStorage(): void {
    const formData = {
      Nombre: this.Nombre,
      Body: this.Body,
      Link: this.Link,
      Referencia: this.Referencia,
      Fecha: this.Fecha,
      Autor: this.Autor,
      Apellido: this.Apellido,
      Carrera: this.Carrera,
      Especialidad: this.Especialidad,
      Investigacion: this.Investigacion,
      Universidad: this.Universidad
      // ... otras propiedades ...
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }
  loadFormDataFromLocalStorage(): void {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      this.Nombre = formData.Nombre;
      this.Body = formData.Body;
      this.Link = formData.Link;
      this.Referencia = formData.Referencia;
      this.Fecha = formData.Fecha;
      this.Autor = formData.Autor;
      this.Apellido = formData.Apellido;
      this.Carrera = formData.Carrera;
      this.Especialidad = formData.Especialidad;
      this.Investigacion = formData.Investigacion;
      this.Universidad = formData.Universidad;
      // ... establecer otras propiedades ...
    }
  }
  ngOnDestroy() {
    // Limpia tus suscripciones y cualquier otra limpieza necesaria
    this.subscriptions.unsubscribe();
  }
  
  onFileChange(event: Event, section: string): void {
    console.log('Se ha cambiado un archivo en la sección:', section);
    this.saveFormDataToLocalStorage();
  
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
          // ... otros casos si los hay
        }

        // Limpia el valor del input de archivo
        target.value = '';

        // Forzar la actualización de la vista
        this.cdr.detectChanges();
      } else {
        // Manejar el caso cuando file es null
      }
      
    }
    
  }
  onSubmitForm(): void {
    // Determina qué acción tomar basándose en la lógica de tu formulario
    // Por ejemplo, si tienes un selector para el tipo de contenido a enviar
    switch (this.opcionSeleccionada) {
      case 'Temas':
        this.PostTema();
        break;
      case 'Subtema':
        this.PostSubtema();
        break;
      case 'Codigos':
        this.PostCodigo();
        break;
      case 'Programación':
        this.PostProgramacion();
        break;
      case 'Documentación':
        this.PostDocumentacion();
        break;
      case 'Publicación':
        this.PostPublicacion();
        break;
      case 'Encargados':
        this.PostEncargados();
        break;
      // ... otros casos según sea necesario ...
    }
  }
  
   //Validators
  formTemas: FormGroup | undefined;
   
  mostrarAlerta: boolean = true;

 /*--------------------------------------------POST-------------------------------------------- */

  //TEMA

  PostTema(): void {
    this.services.createTema(this.id_admin, this.Nombre).pipe(
      finalize(() => {
        this.updateTemas();
      })
    ).subscribe(() => {
      console.log(this.Nombre)
      this.Nombre = '';
      this.myformTema.get('titulo')?.setValue('');
      alert('Agregado correctamente');

    });
  }
  //ACTUALIZAR LISTA DE TEMAS
  updateTemas(){
    this.services.getTemas().subscribe(temasAll =>
      {
        this.temasAll = temasAll;
      });
  }

  //VALIDACIONES
  public myformTema!:FormGroup;

  private createmyformTema():FormGroup{
    return this.fb.group({
      titulo:['',[Validators.required]]
    });
  }

  public submitFormTema(){
    if(this.myformTema.invalid){
      Object.values(this.myformTema.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
    this.Nombre= this.myformTema.get('titulo')?.value ?? '';
    this.PostTema();

  }

  public get fTema():any{
    return this.myformTema.controls;
  }

  //SUBTEMA
  PostSubtema(): void {
    this.services.createSubtema(this.id_tema, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
      this.resetFormSubtema();
      localStorage.removeItem('formData'); // Limpiar el almacenamiento local 
    })
    this.id_tema = 0;
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';

  }
  resetFormSubtema(): void {
    this.id_tema = 0;
    this.Nombre = '';
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    // ... restablecer otros campos para 'Subtema' ...
  }

  //TEMA

  resetFormTema(): void {
    this.Nombre = '';
    // ... restablecer cualquier otro campo relevante para 'Tema' ...
  }

  //CODIGOS

  PostCodigo(): void {
    this.services.createCodigo(this.id_admin, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
      this.resetFormCodigo();   
    })

    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.Nombre = '';

  }
  resetFormCodigo(): void {
    this.Nombre = '';
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    // ... restablecer cualquier otro campo relevante para 'Código' ...
  }
  //Programacion

  PostProgramacion(): void {
    console.log('Intentando agregar programación');
    console.log('Imagen de programación:', this.imagenProgramacion);
    if (!this.imagenProgramacion) {
      alert('Por favor, selecciona una imagen para la programación.');
      return;
    }
  
    this.subscriptions.add(
      this.services.createProgramacion(
        this.id_admin,
        this.Nombre,
        this.Body,
        this.Link,
        this.imagenProgramacion
      ).subscribe({
        next: (response) => {
          console.log('Programación agregada correctamente', response);
          this.resetFormProgramacion();
        },
        error: (error) => {
          console.error('Error al agregar la programación:', error);
        }
      })
    );
  }
  
  resetFormProgramacion(): void {
    this.Nombre = '';
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.nombreArchivoProgramacion = '';
    this.imagenProgramacion = null;
   
  }
  //Documentacion
  PostDocumentacion(): void {
    if (!this.imagenDocumentacion) {
      alert('Por favor, selecciona una imagen para la documentación.');
      return;
    }
  
    this.subscriptions.add(
      this.services.createDocumentacion(
        this.id_admin,
        this.Nombre,
        this.Body,
        this.Link,
        this.Referencia,
        this.imagenDocumentacion
      ).subscribe({
        next: (response) => {
          console.log('Documentación agregada correctamente', response);
          this.resetFormDocumentacion();
        },
        error: (error) => {
          console.error('Error al agregar la documentación:', error);
        }
      })
    );
  }
  
  resetFormDocumentacion(): void {
    this.Nombre = '';
    this.Body = '';
    this.Link = '';
    this.Referencia = '';
    this.imagenDocumentacion = null;
  }

  // Publicacion

  PostPublicacion(): void {
    
      // Asegúrate de que todos los campos necesarios estén definidos
      if (!this.imagenPublicacion) {
        alert('Por favor, selecciona una imagen para la publicación.');
        return;
      }
    
      this.subscriptions.add(
        this.services.createPublicacion(
          this.id_admin,
          this.Nombre,
          this.Fecha,
          this.Body,
          this.Link,
          this.Autor,
          this.Referencia,
          this.imagenPublicacion
        ).subscribe({
          next: (response) => {
            console.log('Publicación agregada correctamente', response);
            this.resetFormPublicacion();
          },
          error: (error) => {
            console.error('Error al agregar la publicación:', error);
          }
        })
      );
    }
    resetFormPublicacion(): void {
      // Restablecer los campos del formulario de publicaciones a sus valores iniciales
      this.Nombre = '';
      this.Fecha = new Date();
      this.Body = '';
      this.Link = '';
      this.Autor = '';
      this.Referencia = '';
      this.imagenPublicacion = null;
    }
  
    // ... otros métodos del componente ...
  
    // Encargados

    PostEncargados(): void {
      if (!this.imagenEncargado) {
        alert('Por favor, selecciona una imagen.');
        return;
      }
    
      this.subscriptions.add(
        this.services.createEncargados(
          this.id_admin,
          this.Nombre,
          this.Apellido,
          this.Carrera,
          this.Especialidad,
          this.Investigacion,
          this.Universidad,
          this.imagenEncargado
        ).subscribe({
          next: (response) => {
            console.log('Encargado agregado correctamente', response);
            this.resetFormEncargados();
          },
          error: (error) => {
            console.error('Error al agregar el encargado:', error);
          }
        })
      );
    }

  resetFormEncargados(): void {
    // Restablecer los campos del formulario a sus valores iniciales
    this.id_admin = 1;
    this.Nombre = '';
    this.Apellido = '';
    this.Carrera = '';
    this.Especialidad = '';
    this.Investigacion = '';
    this.Universidad = '';
    this.imagenEncargado = null;
    // ... restablecer cualquier otro campo relevante
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









