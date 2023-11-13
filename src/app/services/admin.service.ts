import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api_temas="http://localhost:3000/temas";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_subtemas = "http://localhost:3000/subtemas";
  private api_codigo = "http://localhost:3000/codigo";
  private api_publicaciones = "http://localhost:3000/publicaciones";
  private api_documentacion = "http://localhost:3000/documentacion";
  private api_programacion = "http://localhost:3000/programacion";
  


  constructor(private http:HttpClient) { }


    /* GET ALL --CAMBIAR RUTAS API*/

  public getTemas(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_temas);

  }

  public getSubtemas(): Observable<any>{
    
    return this.http.get(this.api_subtemas);

  }

  public getPublicacion(): Observable<any>{ // HAY QUE HACER UN MOSTRAR POR CADA UNA DE LAS TABLAS
    return this.http.get(this.api_publicaciones);

  }

  public getProgramacion(): Observable<any>{

    return this.http.get(this.api_programacion);

  }

  public getDocumentacion(): Observable<any>{

    return this.http.get(this.api_documentacion);

  }

  public getCodigos(): Observable<any>{

    return this.http.get(this.api_codigo);

  }





}
