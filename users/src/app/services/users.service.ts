import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URI = environment.apiURL + "/api/users"
  URI_ = environment.apiURL + "/api/photos"

  constructor(
    private http: HttpClient
  ) { }
 
  updaterestricted_date(ww:string, www:string){
    return this.http.post<any>(environment.apiURL + '/api/users/Controller/Updaterestricted_date', { ww, www })
    console.log(ww,www)
  }
  //obtener usuario con opiniones
  getUser() {
  //console.log(localStorage.getItem('id'))
    return this.http.get<any>(`${this.URI}/Controller/${localStorage.getItem('id')}`)
  }

  getUserTeacher(id:string) {
  //console.log(localStorage.getItem('id'))
    return this.http.get<any>(`${this.URI}/Controller/${id}`)
  }

  getonly() {
    return this.http.get<any>(`${this.URI}/Controller`)
  }

  get() { 
    return this.http.get<any>(`${this.URI}/ControllerAll/${localStorage.getItem('id')}`)
  }
  getteacher() { 
    return this.http.get<any>(`${this.URI}/ControllerAllteacher`)
  }

  getstd() { 
    return this.http.get<any>(`${this.URI}/ControllerAllstd`)
  }

  registro(name: string, email: string, password: string, rol:string, photo: File) {
    const fd = new FormData()
    fd.append('name', name)
    fd.append('rol', rol)
    fd.append('email', email)
    fd.append('password', password)
    fd.append('image', photo)
    return this.http.post(`${this.URI}/Controller`, fd)// response:true
  }


  sign(email: string, password: string) {
    return this.http.get<any>(`${this.URI}/Controllersign/${email}/${password}`)
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.URI}/Controller/${id}`)
  }
  


  updateusser(id: string, name: string, str1: string, str: string) {
   return this.http.put(`${this.URI}/Controller/usserUpd/${id}`, { 'name': name, 'ciclo': str1, 'mencion':str })
  }

  updatePhoto(id: string, title: string, description: string, password: string, rol: string, celular: string, carrera: string, mencion:string, ciclo: string, sexo: string, dni: string, filosophy:string, photo: File) {
    const fd = new FormData()
    fd.append('name', title)
    fd.append('email', description)
    fd.append('password', password)
    fd.append('rol', rol)
    fd.append('celular', celular)
    fd.append('carrera', carrera)
    fd.append('mencion', mencion)
    fd.append('ciclo', ciclo)
    fd.append('sexo', sexo)
    fd.append('dni', dni)
    fd.append('image', photo)
    fd.append('filosophy', filosophy)
    return this.http.put(`${this.URI}/Controller/${id}`, fd, { reportProgress: true, observe: "events" })
    //    return this.http.put(`${this.URI}/${id}`, { 'name': title, 'email': description, 'password':password })
  }
//URI_
  getOneUser(id: string) {
    return this.http.get<any>(`${this.URI}/Controller/${id}`)
  }
  createOpinion(user: string, imageid: string, value: string) {
    return this.http.post<any>(this.URI_ + '/opinion', { user, imageid, value })
  }
  deleteOpinion(user: string, imageid: string) {
    return this.http.post<any>(this.URI_ + '/opinion/errase', { user, imageid })
  }

}
