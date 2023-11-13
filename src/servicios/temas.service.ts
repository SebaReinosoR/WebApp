// temas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemasService {
  private apiUrl = 'http://localhost:3000/temas';

  constructor(private http: HttpClient) {}

  getTemas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearTema(nombre: string, idSubtema: number): Observable<any> {
    const tema = { nombre, id_subtema: idSubtema };
    return this.http.post(this.apiUrl, tema);
  }
}
