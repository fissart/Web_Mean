import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private URL = `${environment.apiURL}/api/themes/Controller`
  private URLtask = `${environment.apiURL}/api/task/Controller`

  constructor(private http: HttpClient, private router: Router) { }

  //
  themes(user: any) { 
    return this.http.post<any>(this.URL + '/api/wwu', user)
  }

  getThemes(user: any) {
    return this.http.post<any>(this.URL + '/signup', user)
  }
 
  createtheme(unidad: string, curse: string, user: string) {
    return this.http.post<any>(this.URL, { title: "Título", description: `<h5><strong>APRENDIZAJE ESPERADO</strong></h5><ol><li>Capacidades: Embebe objetos</li></ol><pre class="ql-syntax" spellcheck="false">$$\\sum_{i=1}^nx_i=x_1+x_2 \\ldots+x_n$$</pre><ol><li><strong>Conocimientos: Conoce embebimiento</strong></li><li><strong>Actitudes: Asume responsabilidad Construye el triángulo áureo</strong></li></ol><h5><strong>SECUENCIA DIDÁCTICA</strong></h5><p><em>Motivación, desarrollo y evaluación permanentes de actitudes. </em></p><h6><strong>INICIO (20min) </strong></h6><p class="ql-indent-1"><strong>Despertar el interés - Recuperar saberes previos - Estimular el conflicto cognitivo. </strong></p><p class="ql-indent-1"><strong><em>RECURSOS: Diapositiva proyector, pizarra, plumones.</em></strong></p><p class="ql-indent-1">Estructuras planas y tridimensionales tipos</p><h6><strong>DESARROLLO (20min)</strong></h6><p class="ql-indent-1"><strong>Adquirir información - Aplicar - Transferir lo aprendido. </strong></p><p class="ql-indent-1"><strong><em>RECURSOS: Diapositiva proyector, pizarra, plumones.</em></strong></p><p class="ql-indent-1">Desarrollo de la sesión construcción del triángulo áureo y uso de geogebra</p><h6><strong>CIERRE (20min) </strong></h6><p class="ql-indent-1"><strong>Reflexionar sobre el proceso de aprendizaje. </strong></p><p class="ql-indent-1"><strong><em>RECURSOS: Diapositiva proyector, pizarra, plumones.</em></strong></p><p class="ql-indent-1">Se realiza preguntas retroalimentativas ¿Qué otros estructuras bidimensionales y tridimensionales podrían utilizar? ¿Compondría estructuras más complejas en bases a esta estructura?</p><h5><strong>EVALUACIÓN</strong></h5><h6><strong>CRITERIOS DE EVALUACIÓN DE LOS APRENDIZAJES: </strong> Formula y construye una estructura según pautas establecidas</h6><p class="ql-indent-1"><strong>Indicadores de evaluación</strong></p><ol><li>Construye el triángulo áureo</li><li>Compone en base al estructura del triángulo áureo</li></ol><p class="ql-indent-1"><strong>Instrumentos</strong></p><ol><li>Ficha de observación</li><li>Lista de cotejo</li></ol><h6><strong>ACTITUD ANTE EL ÁREA: </strong> Presta atención y participa en las actividades</h6><p class="ql-indent-1"><strong>Indicadores de evaluación</strong></p><ol><li>Presta atención</li><li>Participa activamente</li><li>Colabora con sus compañeros</li></ol><p class="ql-indent-1"><strong>Instrumento</strong></p><ol><li>Prueba escrita</li><li>Lista de cotejo</li></ol><h5><strong>BIBLIOGRAFÍA</strong></h5><p class="ql-indent-1">Brock, J., &amp; Arciuli, J. (2014). Communication in autism [eBook edition]. John Benjamins Publishing Company. https://doi.org/10.1007/978-1-4757-4806-2</p><p class="ql-indent-1">Newman, J. L., Fuqua, D. R., Gray, E. A., &amp; Simpson, D. B. (2006). Gender differences in the relationship of anger and depression in a clinical sample. Journal of Counseling &amp; Development, 84, 157-161.</p><p class="ql-indent-1">Cooper, B. S. (2018). Interactive planning and sensing for aircraft in uncertain environments with spatiotemporally evolving threats (Publication No. etd-042219-162643) [Doctoral dissertation, Worcester Polytechnic Institute]. Digital WPI. https://digital.wpi.edu/show/8p58pg31m</p><h5><strong>ANEXO</strong></h5><ol><li>Instrumentos Variables Dimensiones Indicadores Conceptual Define variables Presta atención</li><li>Participa activamente</li><li>Colabora con sus compañeros</li></ol><h6><strong>Recursos</strong></h6><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/VR6tCP8dA70?showinfo=0"></iframe><p></p>`, task: "Tarea", solution: "Solution", time: "2023-07-31T10:15", unidad, curse, user })
  }
  updateTheme(id: string, title: string, description: string, task: string, solution: string, time: string, filew: File) {
    console.log(filew)
    const fd = new FormData() 
    fd.append('title', title)
    fd.append('task', task)
    fd.append('solution', solution)
    fd.append('description', description)
    fd.append('time', time)
    fd.append('image', filew)
    //    return this.http.post<any>(this.URL, {task, theme, unidad, curse, user, filew})
    //return this.http.post(`${this.URL}`, fd, { reportProgress: true, observe: "events" })
    console.log(id)
    return this.http.put<any>(`${this.URL}/${id}`, fd, { reportProgress: true, observe: "events" })
  }

  createthemecopy(unidad: string, curse: string, user: string, title: string, description: string, time: string, task: string, file: string) {
    return this.http.post<any>(this.URL, { title, description, task, time, unidad, curse, user, file })
  }

  gettheme(id: string, curssse: string) {
    return this.http.get(`${environment.apiURL}/api/themes/ControllerThemeUser/${id}/${curssse}`)
  }


  delete(id: string) {
    return this.http.delete(`${this.URL}/${id}`)
  }

  deletetask(id: string) {
    return this.http.delete(`${this.URLtask}/${id}`)
  }


}
