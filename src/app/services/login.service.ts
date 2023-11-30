import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api_admi="http://localhost:3000/administrador";
  private readonly USUARIO_LOGIN_ENDPOINT = "Login";

  idUsuario: string = "";
  tipoUsuario: string = "";
  isLoggedIn: boolean = false;
  private helper = new JwtHelperService();

  constructor(private httpClient:HttpClient) { }
  
  logearUsuario(correo: string, contraseña: string): Observable<{ token: string  , msg:string}> {
    const body = { correo, contraseña };
    const endpoint = this.api_admi + this.USUARIO_LOGIN_ENDPOINT;

    return this.httpClient.post<{ token: string , msg: string}>(endpoint, body).pipe(
      tap((res) => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.storeTokenData(decodedToken);
        localStorage.setItem('token', res.token);
      })
    );
  }

  private storeTokenData(decodedToken: any): void {
    this.idUsuario = decodedToken.data.idusuario;
    this.tipoUsuario = decodedToken.data.tipousuario;
    this.isLoggedIn = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  loggedIn(): boolean {
    if (this.isLoggedIn) {
      return true;
    }

    const token = localStorage.getItem('token') ?? '';

    if (this.helper.isTokenExpired(token)) {
      this.logout();  // Se añadieron los paréntesis para llamar a la función.
      return false;
    }

    this.storeTokenData(this.helper.decodeToken(token));
    return true;
  }



  public postLogin(obj:any): Observable<any> {
    // Se crea un objeto que representa las credenciales del usuario
    const credentials = { usuario: obj.usuario, contrasena: obj.password };
    
    // Retorna un Observable que representa la respuesta de una solicitud HTTP POST
    return this.httpClient.post(`${this.api_admi}`, credentials);
  }

}
