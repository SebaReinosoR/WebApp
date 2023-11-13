import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  private api_conexion="http://localhost:3000/codigo";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_conexion_location = "http://localhost:3000/subtemas";

  constructor(private http:HttpClient) { }

  public getCodigo(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion);

  }
  public getSubtema(): Observable<any>{
    return this.http.get(this.api_conexion_location);

  }
}
