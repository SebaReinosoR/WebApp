import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncargadosService {

  private api_conexion="https://rickandmortyapi.com/api/character";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */

  constructor(private http:HttpClient) { }

  public getAllencargados(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion);

  }


}
