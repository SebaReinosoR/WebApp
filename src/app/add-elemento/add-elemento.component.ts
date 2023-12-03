import { Component , AfterViewInit, OnInit } from '@angular/core';
import {AdminService}  from '../services/admin.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/internal/operators/finalize';


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


  constructor( private services:AdminService, private formBuilder: FormBuilder, private location: Location, private fb:FormBuilder) {
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
    this.myformTema = this.createmyformTema(); // CREAR LA VALIDACION TEMA
    this.myformSubtema = this.createMyformSubtema();// CREAR LA VALIDACION DE SUBTEMA
    this.myformCodigo= this.createMyformCodigo();// CREAR LA VALIDACION DE CODIGO
    this.myformProgramacion = this.createMyformProgramacion(); // CREAR LA VALIDACION DE PROGRAMACION
    this.myformDocumentacion= this.createMyformDocumentacion();
    this.myformPublicacion = this.createMyformPublicacion();
    this.myformEncargados = this.createMyformEncargados();

  }




 /*----------------------------------------------------------------------------------POST-------------------------------------------------------------------------------- */

  //TEMA---------------------------------------------

  PostTema(): void {

    this.services.createTema(this.id_admin, this.Nombre).pipe(
      finalize(() => {
        this.updateTemas();
      })
    ).subscribe(() => {
      this.Limpieza_Varibles_local();
      this.myformSubtema.reset();
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
    if (this.temasAll.find((tema) => tema.Nombre === this.Nombre)) {
      alert('Ya existe un elemento con este Titulo');
  } else {
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
    this.services.createProgramacion(this.id_admin, this.Nombre, this.Body, this.Link).subscribe(() => {
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformProgramacion.reset();

    })
  }

  //VALIDACION
  public myformProgramacion!:FormGroup;

  private createMyformProgramacion(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: ['', [Validators.required]]
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
    this.services.createDocumentacion(this.id_admin, this.Nombre, this.Body, this.Link, this.Referencia).subscribe(() => {
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformDocumentacion.reset();
    })

  }

  //VALIDACION
  public myformDocumentacion!:FormGroup;

  private createMyformDocumentacion(): FormGroup {
    return this.fb.group({
      Nombre: ['', [Validators.required]],
      Body: ['', [Validators.required]],
      Link: [''],
      Referencia: ['']
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
    this.services.createPublicacion(this.id_admin, this.Nombre,this.Fecha, this.Body, this.Link,this.Autor, this.Referencia).subscribe(() => {
      console.log(this)
      alert('Agregado correctamente');
      this.Limpieza_Varibles_local();
      this.myformPublicacion.reset();
    })

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
      this.services.createEncargados(this.id_admin,this.Nombre, this.Apellido, this.Carrera, this.Especialidad, this.Investigacion, this.Universidad).subscribe(() => {
        alert('Agregado correctamente');
        this.Limpieza_Varibles_local();
        this.myformPublicacion.reset();
      })

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
      Universidad: ['',[Validators.required]]
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

    //LIMPIEZA DE CAMPOS
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




