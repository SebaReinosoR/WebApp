import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemasService  {

  private apiURL="http://localhost:3000/temas"  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_subtemas = "http://localhost:3000/subtemas";

  constructor(private http:HttpClient) { }

  public getAlltemas(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.apiURL);

  }
  public getAllsubtema(): Observable<any>{
    return this.http.get(this.api_subtemas);

  }
  public getSubtemaById(id:number): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */
  const url = `${this.api_subtemas}/${id}`;
  return this.http.get(url);
  } 

}

