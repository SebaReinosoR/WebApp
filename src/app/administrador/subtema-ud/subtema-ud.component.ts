import { Component} from '@angular/core';
import {AdminService}  from '../../services/admin.service'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subtema-ud',
  templateUrl: './subtema-ud.component.html',
  styleUrls: ['./subtema-ud.component.scss']
})
export class SubtemaUDComponent {
  
  tema:any;
  id:number = 0;
  subtema:any;
  temasAll:any;
  temaOn:any=-1;

  constructor(private route: ActivatedRoute, private services:AdminService) {
    this.services.getTemas().subscribe(temasAll => 
      {
        this.temasAll = temasAll;
      });

    

      
   }

  ngOnInit() : void{
    //capturar ID
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
   
   //GET
   
 
    this.services.getTemaById(this.id).subscribe(tema => 
      {
        this.tema = tema;  

      });

    this.services.getSubTemaByIdTema(this.id).subscribe(subtema => 
      {
        this.subtema = subtema;
        
      });    
  
    
  }

   //PUT

  PutSubtema(idSubtema: number, form: NgForm): void {
    const { id_tema, Nombre, Body, Link, Referencia} = form.value;
    console.log(form.value);
    this.services.PutSubtema(idSubtema, id_tema, Nombre, Body, Link, Referencia).subscribe(() => {
      alert('Modificado correctamente');
      this.services.getSubTemaByIdTema(this.id).subscribe(subtema => 
        {
          this.subtema = subtema; 
        }); 
      });
  }

  //DELETE


  deleteSubtema(idSubtema:number): void {
    this.services.deleteSubtema(idSubtema).subscribe(() => {
      alert('Eliminado correctamente');
         
      this.services.getSubTemaByIdTema(this.id).subscribe(subtema => 
        {
          this.subtema = subtema;
          
        }); 
    });
  }

}


