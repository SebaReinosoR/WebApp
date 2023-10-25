import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import {
  faBook,
  faUser,
  faContactBook,
  faSearch,
  faTrowel,
  faHamburger,
  faAmbulance,
  faAnchorCircleCheck,
} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  searchIcon = faSearch;
  faHamburger = faHamburger;



  left_nav_lis_item: Array<{ title: string; icon: any,url:string }> = [
    {
      title: "Tema",
      icon: faBook,
      url:'inicio'
    },
    {
      title: "Códigos",
      icon: faUser,
      url:'Codigo'
    },
    {
      title: "Documentos",
      icon: faTrowel,
      url:'Documento'
    },
    {
      title: "Programación",
      icon: faAmbulance,
      url:'Programacion'
    },
    {
      title: "Publicaciones",
      icon: faAnchorCircleCheck,
      url:'Publicacion'
    },
  ];

  showLeftNav: boolean = true;

  showAndHideLeftNav() {
    this.showLeftNav = !this.showLeftNav;
  }

}


