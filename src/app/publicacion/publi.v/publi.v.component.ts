import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PublicacionService } from '../../services/publicacion.service'

@Component({
  selector: 'app-publi.v',
  templateUrl: './publi.v.component.html',
  styleUrls: ['./publi.v.component.scss']
})
export class PubliVComponent {

   id:number=-1;
   publi:any;
  constructor(private route: ActivatedRoute, private service: PublicacionService) { 
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });


  }

  ngOnInit() {
   
  this.service.getPubliById(this.id).subscribe(publi =>
    {
      this.publi = publi;

    })
  
  }

}
