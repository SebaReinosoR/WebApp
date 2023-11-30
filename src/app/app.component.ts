import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'WebApp';
  isAuthenticated = false;
  constructor( public router: Router, public authService: AuthService ){}
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
/*
@Injectable({
  providedIn: 'root',
})

export class temasService {
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
*/

