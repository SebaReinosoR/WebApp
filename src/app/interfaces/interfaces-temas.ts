import { Subtema } from "./interfaces-subtemas"


export interface Temas {
  id_admin:number;
  idTema:number;
  Nombre: string;
  subtema: Subtema[];
}
