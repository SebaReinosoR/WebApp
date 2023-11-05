import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  private api_conexion_caracter="https://rickandmortyapi.com/api/character";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_conexion_location = "https://rickandmortyapi.com/api/location";

  constructor(private http:HttpClient) { }

  public getAllcodigo(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion_caracter);

  }
  public getAllsubtema(): Observable<any>{
    return this.http.get(this.api_conexion_location);

  }
}
