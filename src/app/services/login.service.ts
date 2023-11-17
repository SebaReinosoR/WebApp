import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api_admi="http://localhost:3000/administrador";
  
  constructor(private http:HttpClient) { }
  
  public postLogin(obj:any): Observable<any> {
    // Se crea un objeto que representa las credenciales del usuario
    const credentials = { usuario: obj.usuario, contrasena: obj.password };
    
    // Retorna un Observable que representa la respuesta de una solicitud HTTP POST
    return this.http.post(`${this.api_admi}`, credentials);
  }
  
  
 








 /*  public ingresarAplicativo(obj: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getLogin(obj.usuario, obj.password).subscribe({
        next: (administrador: any) => {
          const usuarioValido = administrador && administrador.length > 0;
          observer.next(usuarioValido);
          observer.complete();
        },
        error: (error: any) => {
          console.error('Error al obtener el administrador:', error);
          observer.error('Error interno del servidor');
        }
      });
    });
  }
  private getLogin(usuario: string, contrasena: string): Observable<any> {
    return this.http.get(`${this.api_admi}/usuario=${usuario}&contrasena=${contrasena}`);
  }
 */
 
}
