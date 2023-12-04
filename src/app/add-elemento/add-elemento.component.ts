import { Component ,  OnDestroy, AfterViewInit, OnInit , ChangeDetectorRef} from '@angular/core';
import {AdminService}  from '../services/admin.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-add-elemento',
  templateUrl: './add-elemento.component.html',
  styleUrls: ['./add-elemento.component.scss']
})
export class AddElementoComponent implements AfterViewInit, OnInit {

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

  temasAll: any[] = [];
  codigosAll: any[] = [];
  subtemasAll: any[] = [];
  publiAll: any[] = [];
  programacionAll: any[] = [];
  documentosAll: any[] = [];
  encargadosAll: any[] = [];

  mostrarCuadro: boolean = false;

  //CARGA IMG
  imagenEncargado: File | null = null;
  imagenPublicacion: File | null = null;
  imagenDocumentacion: File | null = null;
  imagenProgramacion: File | null = null;

  nombreArchivoProgramacion: string = '';
  nombreArchivoDocumentacion: string = '';
  nombreArchivoPublicacion: string = '';
  nombreArchivoEncargado: string = '';

  constructor( private services:AdminService, private formBuilder: FormBuilder, private location: Location, private fb:FormBuilder , private cdr: ChangeDetectorRef) {
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


  // GET ALL

    this.services.getTemas().subscribe(temasAll =>
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




  id_tema: number;
  mostrarAlerta: boolean = true;



  ngOnInit(): void {
    this.loadFormDataFromLocalStorage();

    //VALIDATORS-----------------------------
    this.myformTema = this.createmyformTema(); // CREAR LA VALIDACION TEMA
    this.myformSubtema = this.createMyformSubtema();// CREAR LA VALIDACION DE SUBTEMA
    this.myformCodigo= this.createMyformCodigo();// CREAR LA VALIDACION DE CODIGO
    this.myformProgramacion = this.createMyformProgramacion(); // CREAR LA VALIDACION DE PROGRAMACION
    this.myformDocumentacion= this.createMyformDocumentacion();
    this.myformPublicacion = this.createMyformPublicacion();
    this.myformEncargados = this.createMyformEncargados();

  }
  //LOCAL STORAGE
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
    }
  }
  private subscriptions = new Subscription();
  ngOnDestroy() {
    // Limpia tus suscripciones y cualquier otra limpieza necesaria
    this.subscriptions.unsubscribe();
  }

  //CARGA DE IMG

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

 /*----------------------------------------------------------------------------------POST-------------------------------------------------------------------------------- */

  //TEMA---------------------------------------------

  PostTema(): void {

    this.services.createTema(this.id_admin, this.Nombre).pipe(
      finalize(() => {
        this.updateTemas();
      })
    ).subscribe(() => {
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformTema.reset();
      localStorage.removeItem('formData'); // Limpiar el almacenamiento local

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
    if (this.temasAll.find((tema) => tema.Nombre === this.Nombre)) {
      alert('Ya existe un elemento con este Titulo');
  } else {
      this.saveFormDataToLocalStorage();

      this.PostTema();
  }
  }

  public get fTema():any{
    return this.myformTema.controls;
  }

  //SUBTEMA----------------------------------------------------------
  PostSubtema(): void {
    this.services.createSubtema(this.id_tema, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformSubtema.reset(); // Limpieza de input
      localStorage.removeItem('formData'); // Limpiar el almacenamiento local
    })


  }

  // VALIDACION

  seleccionarTema() {
    this.mostrarAlerta = this.myformSubtema.get('id_tema')?.value === '0' && this.myformSubtema.get('id_tema')?.value === '';
  }
  public myformSubtema!:FormGroup;

  private createMyformSubtema (): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      id_tema: [0, [Validators.required ]],
      Body: ['', [Validators.required]],
      Link: [''],
      Referencia: [''],
    });
  }
  public submitFormSubtema(): void {
    if (this.myformSubtema.invalid) {
      Object.values(this.myformSubtema.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformSubtema.get('Nombre')?.value ?? '';
      this.id_tema = this.myformSubtema.get('id_tema')?.value;
      this.Body = this.myformSubtema.get('Body')?.value ?? '';
      this.Link = this.myformSubtema.get('Link')?.value ?? '';
      this.Referencia = this.myformSubtema.get('Referencia')?.value ?? '';

      if (this.subtemasAll.find((subtema) =>(subtema.Nombre === this.Nombre) && (subtema.id_tema.toString() === this.id_tema.toString()))) {  //VALIDACION DE TITULO DUPLICADO

        alert('Ya existe un elemento con este Titulo en el Tema seleccionado');

    } else {
      this.PostSubtema();

    }


  }
  public get fSubtema():any{
    return this.myformSubtema.controls;
  }



  //CODIGOS---------------------------------------------------

  PostCodigo(): void {
    this.services.createCodigo(this.id_admin, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformCodigo.reset();
      localStorage.removeItem('formData'); // Limpiar el almacenamiento local
    })



  }
  //VALIDACION
  public myformCodigo!:FormGroup;

  private createMyformCodigo(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: ['', [Validators.required]],
      Referencia: [''],
    });
  }
  public submitFormCodigo(): void {
    if (this.myformCodigo.invalid) {
      Object.values(this.myformCodigo.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformCodigo.get('Nombre')?.value ?? '';
      this.Body = this.myformCodigo.get('Body')?.value ?? '';
      this.Link = this.myformCodigo.get('Link')?.value ?? '';
      this.Referencia = this.myformCodigo.get('Referencia')?.value ?? '';
      if (this.codigosAll.find((codigo) => codigo.Nombre === this.Nombre)) {
        alert('Ya existe un elemento con este Titulo');
    } else {
      this.PostCodigo();
    }


  }
  public get fCodigo():any{
    return this.myformCodigo.controls;
  }


  //Programacion-----------------------------------------------------

  PostProgramacion(): void {
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
          alert('Agregado correctamente');
          console.log('Programación agregada correctamente', response);
          this.myformProgramacion.reset();
          this.Limpieza_Varibles_local();
        },
        error: (error) => {
          console.error('Error al agregar la programación:', error);
        }
      })
    );
  }

  //VALIDACION
  public myformProgramacion!:FormGroup;

  private createMyformProgramacion(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: ['', [Validators.required]],
      Imagen: [null, [Validators.required]]
    });
  }
  public submitFormProgramacion(): void {
    if (this.myformProgramacion.invalid) {
      Object.values(this.myformProgramacion.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformProgramacion.get('Nombre')?.value ?? '';
      this.Body = this.myformProgramacion.get('Body')?.value ?? '';
      this.Link = this.myformProgramacion.get('Link')?.value ?? '';
      if (this.programacionAll.find((progra) => progra.Nombre === this.Nombre)) {
        alert('Ya existe un elemento con este Titulo');
    } else {
      this.PostProgramacion();
    }


  }
  public get fProgramacion():any{
    return this.myformProgramacion.controls;
  }
  //Documentacion---------------------------------------------------------
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
          alert('Agregado correctamente');
          console.log('Documentación agregada correctamente', response);
          this.myformDocumentacion.reset();
          this.Limpieza_Varibles_local();
        },
        error: (error) => {
          console.error('Error al agregar la documentación:', error);
        }
      })
    );
  }

  //VALIDACION
  public myformDocumentacion!:FormGroup;

  private createMyformDocumentacion(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: [''],
      Referencia: [''],
      Imagen: [null, [Validators.required]]
    });
  }
  public submitFormDocumentacion(): void {
    if (this.myformDocumentacion.invalid) {
      Object.values(this.myformDocumentacion.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformDocumentacion.get('Nombre')?.value ?? '';
      this.Body = this.myformDocumentacion.get('Body')?.value ?? '';
      this.Link = this.myformDocumentacion.get('Link')?.value ?? '';
      this.Referencia = this.myformDocumentacion.get('Referencia')?.value ?? '';

      if (this.documentosAll.find((docu) => docu.Nombre === this.Nombre)) {
        alert('Ya existe un elemento con este Titulo');
    } else {
      this.PostDocumentacion();
    }

  }
  public get fDocumentacion():any{
    return this.myformDocumentacion.controls;
  }


  // Publicacion-------------------------------------------------------

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
          alert('Agregado correctamente');
          console.log('Publicación agregada correctamente', response);
          this.myformPublicacion.reset();
          this.Limpieza_Varibles_local();

        },
        error: (error) => {
          console.error('Error al agregar la publicación:', error);
        }
      })
    );
  }

  //VALIDACION

  public myformPublicacion!:FormGroup;

  private createMyformPublicacion(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Autor: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: [''],
      Referencia: ['']
    });
  }
  public submitFormPublicacion(): void {
    if (this.myformPublicacion.invalid) {
      Object.values(this.myformPublicacion.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformPublicacion.get('Nombre')?.value ?? '';
      this.Autor= this.myformPublicacion.get('Autor')?.value ?? '';
      this.Fecha= this.myformPublicacion.get('Fecha')?.value ?? '';
      this.Body = this.myformPublicacion.get('Body')?.value ?? '';
      this.Link = this.myformPublicacion.get('Link')?.value ?? '';
      this.Referencia = this.myformPublicacion.get('Referencia')?.value ?? '';

      if (this.publiAll.find((publi) => publi.Nombre === this.Nombre)) {
        alert('Ya existe un elemento con este Titulo');
    } else {
      this.PostPublicacion();

    }


  }
  public get fPublicacion():any{
    return this.myformPublicacion.controls;
  }

    // Encargados---------------------------------------------------------------

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
            alert('Agregado correctamente');
            console.log('Encargado agregado correctamente', response);
            this.Limpieza_Varibles_local();
            this.myformEncargados.reset();
          },
          error: (error) => {
            console.error('Error al agregar el encargado:', error);
          }
        })
      );
    }

    //VALIDACION

  public myformEncargados!:FormGroup;

  private createMyformEncargados(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Carrera: ['', [Validators.required]],
      Especialidad: ['', [Validators.required]],
      Investigacion: ['', [Validators.required]],
      Universidad: ['',[Validators.required]],
      Imagen: [null, [Validators.required]]
    });
  }
  public submitFormEncargados(): void {
    if (this.myformEncargados.invalid) {
      Object.values(this.myformEncargados.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;
    }
      this.Nombre= this.myformEncargados.get('Nombre')?.value ?? '';
      this.Apellido = this.myformEncargados.get('Apellido')?.value ?? '';
      this.Carrera = this.myformEncargados.get('Carrera')?.value ?? '';
      this.Especialidad = this.myformEncargados.get('Especialidad')?.value ?? '';
      this.Investigacion = this.myformEncargados.get('Investigacion')?.value ?? '';
      this.Universidad = this.myformEncargados.get('Universidad')?.value ?? '';

      if (this.encargadosAll.find((encargados) => encargados.Nombre === this.Nombre && encargados.Apellido === this.Apellido)) {
        alert('Ya existe un encargado con este nombre y apellido');
    } else {
      this.PostEncargados();
    }


  }
  public get fEncargados():any{
    return this.myformEncargados.controls;
  }

  //LIMPIEZA DE CAMPOS LOCALES
  Limpieza_Varibles_local(){
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

  }

/*--------------------------------------------FUNCION PARA SELECT PRINCIPAL-------------------------------------------- */


    arreglo: string[] = [
      "Temas",
      "Encargados",
      "Códigos",
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
        this.mostrarCodigos = this.opcionSeleccionada === 'Códigos';
        this.mostrarProgramacion = this.opcionSeleccionada === 'Programación';
        this.mostrarDocumentacion = this.opcionSeleccionada === 'Documentación';
        this.mostrarPublicacion = this.opcionSeleccionada === 'Publicación';
        this.mostrarSubtema = this.opcionSeleccionada === 'Subtema';
        // Define condiciones para otros campos aquí
      };

    //SECCION DE AYUDA (?)------------------------
    mostrarMensaje() {
      this.mostrarCuadro = true;
    }

    ocultarMensaje() {
      this.mostrarCuadro = false;
    }
    }




