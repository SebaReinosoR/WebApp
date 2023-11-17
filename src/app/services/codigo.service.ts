import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  private api_codigo="http://localhost:3000/codigo";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */


  constructor(private http:HttpClient) { }

  public getCodigo(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_codigo);

  }

}
