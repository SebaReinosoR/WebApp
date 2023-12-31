import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private api_conexion="http://localhost:3000/publicaciones";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  //private api_conexion_location = "https://rickandmortyapi.com/api/location";

  constructor(private http:HttpClient) { }

  public getAllpubli(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_conexion);

  }

  public getAllpubliLink(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

  return this.http.get(this.api_conexion);

}
public getPubliById(id:number): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */
    const url = `${this.api_conexion}/${id}`;
    return this.http.get(url);

  }


}
