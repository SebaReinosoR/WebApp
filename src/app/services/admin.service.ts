import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api_conexion_caracter="https://rickandmortyapi.com/api/character";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_conexion_location = "https://rickandmortyapi.com/api/location";

  constructor(private http:HttpClient) { }

  public getAllTema(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion_caracter);

  }
  public getAllsubtema(): Observable<any>{
    return this.http.get(this.api_conexion_location);

  }

  /*agregar los post aqui
  public getAllELMENTO(): Observable<any>{  HAY QUE HACER UN MOSTRAR POR CADA UNA DE LAS TABLAS
    return this.http.get(this.api_conexion_location);

  }

  */
}
