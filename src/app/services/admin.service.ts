import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api_temas="http://localhost:3000/temas";  /* AQUI SE DEBE REALIZAR LA CONEXICION CON LA API */
  private api_subtemas = "http://localhost:3000/subtemas";
  private api_codigo = "http://localhost:3000/codigo";
  private api_publicaciones = "http://localhost:3000/publicaciones";
  private api_documentacion = "http://localhost:3000/documentacion";
  private api_programacion = "http://localhost:3000/programacion";
  private api_encargados = "http://localhost:3000/encargados";
  


  constructor(private http:HttpClient) { }


    //GET ALL

  public getTemas(): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */

    return this.http.get(this.api_temas);

  }

  public getSubtemas(): Observable<any>{
    
    return this.http.get(this.api_subtemas);

  }

  public getPublicacion(): Observable<any>{ // HAY QUE HACER UN MOSTRAR POR CADA UNA DE LAS TABLAS
    return this.http.get(this.api_publicaciones);

  }

  public getProgramacion(): Observable<any>{

    return this.http.get(this.api_programacion);

  }

  public getDocumentacion(): Observable<any>{

    return this.http.get(this.api_documentacion);

  }

  public getCodigos(): Observable<any>{

    return this.http.get(this.api_codigo);

  }
  public getEncargados(): Observable<any>{

    return this.http.get(this.api_encargados);

  }

//GET ID

public getTemaById(id:number): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */
    const url = `${this.api_temas}/${id}`;
    return this.http.get(url);

  }
public getSubTemaByIdTema(id:number): Observable<any>{ /* CREAR FUNCION PUBLICA QUE RETORNE LA CONEXION */
const url = `${this.api_subtemas}/tema/${id}`;
  return this.http.get(url);
} 
 
//POST ALL
public createSubtema(id_tema: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const subtemaData = { id_tema, Nombre, Body, Link, Referencia };

return this.http.post(this.api_subtemas, subtemaData);

}
public createTema(id_admin: number, Nombre: string): Observable<any> {
  const TemaData = { id_admin, Nombre};

return this.http.post(this.api_temas, TemaData);

}
public createCodigo(id_admin: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const codigoData = { id_admin, Nombre, Body, Link, Referencia};

return this.http.post(this.api_codigo, codigoData);

}

public createProgramacion(id_admin: number, Nombre: string, Body: string, Link: string): Observable<any> {
  const PrograData = { id_admin, Nombre, Body, Link};

return this.http.post(this.api_programacion, PrograData);

}
public createDocumentacion(id_admin: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const DocuData = { id_admin, Nombre, Body, Link , Referencia};

return this.http.post(this.api_documentacion, DocuData);

}

public createPublicacion(id_admin: number, Nombre: string, Fecha:Date, Body: string, Link: string, Autor:string, Referencia: string): Observable<any> {
  const PubliData = { id_admin,Nombre,Fecha,Body,Referencia,Autor, Link};

return this.http.post(this.api_publicaciones, PubliData);

}

public createEncargados(id_admin: number, Nombre: string, Apellido: string, Carrera: string, Especialidad: string, Investigacion: string,Universidad: string): Observable<any> {
  const EncargadosData = { id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad};

return this.http.post(this.api_encargados, EncargadosData);

}
//PUT
public PutCodigos(id: number, id_admin: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const url = `${this.api_codigo}/${id}`;
  const body = {id_admin, Nombre, Body, Link, Referencia};
  return this.http.put(url, body);
}

public PutTema(id: number, id_admin: number, Nombre: string): Observable<any> {
  const url = `${this.api_temas}/${id}`;
  const body = {id_admin, Nombre};
  return this.http.put(url, body);
}

public PutProgramacion(id: number, id_admin: number, Nombre: string, Body: string, Link: string): Observable<any> {
  const url = `${this.api_programacion}/${id}`;
  const body = {id_admin, Nombre, Body, Link};
  return this.http.put(url, body);
}

public PutPublicacion(id: number, id_admin: number,Nombre: string, Fecha: Date, Body: string, Referencia: string,Autor:string, Link: string): Observable<any> {
  const url = `${this.api_publicaciones}/${id}`;
  const body = {id_admin, Nombre,Fecha,Body,Referencia,Autor, Link};
  return this.http.put(url, body);
}

public PutDocumentacion(id: number, id_admin: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const url = `${this.api_documentacion}/${id}`;
  const body = {id_admin, Nombre, Body, Link, Referencia};
  return this.http.put(url, body);
}
public PutEncargados(id: number, id_admin: number, Nombre: string, Apellido: string, Carrera: string, Especialidad: string, Investigacion: string, Universidad: string): Observable<any> {
  const url = `${this.api_encargados}/${id}`;
  const body = {id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad};
  return this.http.put(url, body);
}

public PutSubtema(id: number, id_tema: number, Nombre: string, Body: string, Link: string, Referencia: string): Observable<any> {
  const url = `${this.api_subtemas}/${id}`;
  const body = {id_tema, Nombre, Body, Link, Referencia};
  return this.http.put(url, body);
}

//DELETE

public deleteSubtema(id: number): Observable<any> {
  const url = `${this.api_subtemas}/${id}`;
  return this.http.delete(url);
}

public deleteCodigos(id: number): Observable<any> {
  const url = `${this.api_codigo}/${id}`;
  return this.http.delete(url);
}
public deleteDocumentacion(id: number): Observable<any> {
  const url = `${this.api_documentacion}/${id}`;
  return this.http.delete(url);
}
public deleteEncargado(id: number): Observable<any> {
  const url = `${this.api_encargados}/${id}`;
  return this.http.delete(url);
}
public deleteProgramacion(id: number): Observable<any> {
  const url = `${this.api_programacion}/${id}`;
  return this.http.delete(url);
}
public deletePublicacion(id: number): Observable<any> {
  const url = `${this.api_publicaciones}/${id}`;
  return this.http.delete(url);
}
public deleteTema(id: number): Observable<any> {
  const url = `${this.api_temas}/${id}`;
  return this.http.delete(url);
}


}
