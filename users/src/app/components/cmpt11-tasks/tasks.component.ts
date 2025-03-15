import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service'
import { environment } from '../../../environments/environment';
//import { KatexOptions } from 'ng-katex';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  idtheme: string = "";
  idunity: string = ""
  iduser: string = "";
  idcurse: string = ""
  pdfSrc: string = ""
  type: string = ""
  name: string = ""
  markdown = `Este es un modelo de como puede escribir (formato html y css) en esta área borre todo y escriba

    <h1 class='bg-info text-success border p-1 rounded'>Teorema 38 $\\sqrt[5]{5}\\geq \\sqrt[5]{5x^2+3}$</h1>
    
    <h2 class='bg-info text-light border rounded text-success p-1'>Titulo</h2>
    
    <h3 class='bg-light border rounded text-success p-1'>Titulo</h3>
    
    <img class='bg-light p-1 m-auto w-100'
        src="https://thumbs.dreamstime.com/b/elegant-blue-background-swirls-space-your-text-elegant-blue-background-swirls-space-your-text-159291073.jpg"
        width="75%" />
    
    <ol>
        <li><h5 class='bg-info border p-1 rounded'>Teorema 38 $\\sqrt[5]{5}\\geq \\sqrt[5]{5x^2+3}$</h5>

            <ul>
                <li><h6 class='bg-primary border p-1 rounded'>Teorema 38 $\\sqrt[5]{5}\\geq \\sqrt[5]{5x^2+3}$</h6>
    
                    Este teorema establece que cualquier potencia de un binomio
    
                    $$
                    \\begin{aligned}
                    (x^2-x)(x-3)&\\equiv (x^2-x)\\sqrt[3]{(x-3)}\\\\
                    &\\equiv (x^2-x)(x-3)\\\\
                    &\\equiv (x^2-x)(x-3)\\\\
                    \\end{aligned}
                    $$
                </li>
    
                <li><h6 class='bg-primary border p-1 rounded'>Teorema 38 $\\sqrt[5]{5}\\geq \\sqrt[5]{5x^2+3}$</h6></li>
    
            </ul>
        </li>
    
        <li>
        <h5 class='bg-info border p-1 rounded'>Teorema 39 $\\sqrt[5]{5}\\geq \\sqrt[5]{5x^2+3}$</h5>
        </li>
    </ol>
    
    <hr>
    
    $$
    \\begin{Bmatrix}
    a & b \\\\
    c & d
    \\end{Bmatrix}
    $$
    
    $$\\int_1^3=\\lim_{n\\to\\infty}\\sum_{n\\to\\infty}^n x_i$$ donde
    
    $x\\in\\mathbb{R}$`

  apiUrl = environment.apiURL;
  photo: any = [];


  public archivos: any[] = [];
  public photoSelected!: string | ArrayBuffer | null;
  public loading!: string;
  public _value: number = 0;

  get value(): number {
    return this._value;
  }
  set value(value: number) {
    if (!isNaN(value) && value <= 100) {
      this._value = value;
    }
  }

  //public markdown2: string = "www"
  //private www!: string | null;

  get valuew(): string {
    //console.log(this.markdown2.replace(/\n|\r/g, ''))
    return this.markdown.replace(new RegExp("</p><p>", "g"), "").replace(new RegExp("<br>", "g"), "").replace(new RegExp("&amp;", "g"), "&")   ;//replace(/\n|\r/g, '');
  }

  onContentChanged = (event: any) => {
    this.markdown = event.html//.replace(new RegExp("\\(", "g"), "<span>z").replace(new RegExp("\\)", "g"), "z</span>")
    //console.log(event.html.replace(new RegExp("w_w", "g"), "<span class='text-info'>w_w</span>"))
  }

  constructor(
    private router: ActivatedRoute, private routerr: Router,
    private task: TaskService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("idunity", this.router.snapshot.paramMap.get('idunity') + '')
    this.iduser = localStorage.getItem('id') || "";
    this.idcurse = localStorage.getItem('idcurso') || "";
    this.idtheme = this.router.snapshot.paramMap.get('idtheme') + '';
    this.idunity = this.router.snapshot.paramMap.get('idunity') + '';
    console.log(localStorage.getItem('id') || "")
  }


  onImgError(event: any) {
    event.target.src = './assets/save.png'
  }
  capturandoFile(event: any) {
    const ww = event.target.files[0];
    this.archivos = [];//resetea la matriz a rango 1
    this.pdfSrc = "";//resetea la matriz a rango 1
    this.archivos.push(ww);
    console.log(event.target.files[0].type);
    if (event.target.files[0]) {
      this.type = event.target.files[0].type
      this.name = event.target.files[0].name
      console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  savetask(task: HTMLTextAreaElement) {
    console.log(this.idtheme, this.idunity, this.idcurse, this.iduser)
    this.task.savetask('', task.value, '', this.idtheme, this.idunity, this.idcurse, this.iduser, 'F', this.archivos[0])
      .subscribe(
        (res: any) => {
          this.loading = "false";
          this.value = Math.round((100 / res.total) * res.loaded);
          if (res.total == res.loaded && res.type > 0 && res.ok) {
            console.log(res.ok);
            this.routerr.navigate([`/curso/${localStorage.getItem('idcurso') || ""}`]);
          }
        },
        err => console.log(err)
      );
    return false;
  }

}
