
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http'
  import { environment } from "../../environments/environment";

  @Injectable({
  providedIn: 'root'
  })

export class Svc24BIBLIOTECAService {

  constructor(private http: HttpClient) { }
  URI = `${environment.apiURL}/api/BIBLIOTECA`;

  save(user:string ) {
  const fd = new FormData();
  fd.append('title', "Título");
  fd.append('description', "Breve  descripción");
  fd.append('user', user);
  return this.http.post(`${this.URI}`, fd );
  }

  getupdate(user:any) {
  console.log(user)
  return this.http.get<any>(`${this.URI}/${user}`);
  }

  update(id: string, title:string, description:string, subtype:string, author:string, archivo: File) {
  const fd = new FormData();
  fd.append('title', title);
  fd.append('description', description);
  fd.append('subtype', subtype);
  fd.append('author', author);
  fd.append('image', archivo);
  return this.http.put(`${this.URI}/${id}`, fd, { reportProgress: true, observe: "events" });
  }
  


  gets() {
  return this.http.get<any>(`${this.URI}`);
  }

  remove(id: string ) {
  return this.http.delete(`${this.URI}/${id}`);
  }
  }
