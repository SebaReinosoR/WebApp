
import { Component, OnInit } from '@angular/core';
import { TemasService } from './temas.service';

@Component({
  selector: 'app-lista-temas',
  templateUrl: './lista-temas.component.html',
  styleUrls: ['./lista-temas.component.css'],
})
export class ListaTemasComponent implements OnInit {
  temas: any[] = [];

  constructor(private temasService: TemasService) {}

  ngOnInit(): void {
    this.cargarTemas();
  }

  cargarTemas(): void {
    this.temasService.getTemas().subscribe(
      (temas) => {
        this.temas = temas;
      },
      (error) => {
        console.error('Error al obtener temas', error);
      }
    );
  }
}
