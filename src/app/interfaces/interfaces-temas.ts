import { Subtema } from "./interfaces-subtemas"


export interface Temas {
  id:number;
  name: string;
  body: string;
  img : string;
  subtema_hijo: Subtema[];
}
