import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {

  private api_conexion="http://localhost:3000/programacion";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  

  constructor(private http:HttpClient) { }

  public getAllprogramacion(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion);

  }

}
