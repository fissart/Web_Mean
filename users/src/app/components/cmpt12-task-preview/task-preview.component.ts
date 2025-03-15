import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service'
import { environment } from '../../../environments/environment';
import { KatexOptions } from 'ng-katex'

//import { KatexOptions } from 'ng-katex';

// declare var markdownitw: any;
// declare var texmath: any;
// declare var katex: any;

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {
  apiUrl = environment.apiURL;
  photo: any = [];

  markdown: string = 'www';
  markdownw: string = 'www';
  type: string = ""
  name: string = ""

  get valuew(): string {
    return this.markdown ? this.markdown.replace(new RegExp("</p><p>", "g"), "").replace(new RegExp("<br>", "g"), "").replace(new RegExp("&amp;", "g"), "&") : ''
  }

  onContentChanged = (event: any) => {
    this.markdown = event.html
  }
  code: boolean = false;

  show() {
    if (!this.code) {
      this.code = true
    } else {
      this.code = false
    }
  }

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

  constructor(
    private router: ActivatedRoute, private routerr: Router,
    private task: TaskService
  ) { }

  gettheme() {
    this.router.params.subscribe(params => {
      //console.log(this.router.snapshot.paramMap.get('idtask') + '')
      this.task.getTask(this.router.snapshot.paramMap.get('idtask') + '')
        .subscribe(
          (res: any) => {
            if (res) {
              this.photo = res;
              //console.log(res)
              this.loading = "";
              this.markdown = res.task == '' ? 'www' : res.task;
            } else {
              this.routerr.navigate(['/dashboard'])
              //console.log("res.task")
            }
          },
          err => console.log(err)
        )
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('idcurso')) {
      this.routerr.navigate(['/dashboard'])

    }
    this.gettheme()


  }
  onImgError(event: any) {
    event.target.src = './assets/upload.png'
  }
  www(event: any) {
    console.log(event.target)
    //event.target.src = './assets/upload.png'
  }
  options: KatexOptions = {
    displayMode: true,
  };

  capturandoFile(event: any) {
    const ww = event.target.files[0];
    this.archivos = [];//resetea la matriz a rango 1

    this.archivos.push(ww);
    //console.log(event.target.files);
    if (event.target.files[0]) {
      this.type = event.target.files[0].type
      this.name = event.target.files[0].name
      //console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  savetask(task: HTMLTextAreaElement) {
    this.loading = "false"
    this.task.updatetaskready(task.value, this.photo.solution, this.photo.note, this.router.snapshot.paramMap.get('idtask') + '', this.photo.asistence, this.archivos[0])
      .subscribe((res: any) => {
        this.gettheme()
      });
    return false;
  }
  savetaskgetout() {
    if (window.confirm('Desea guardar e ir al curso?. Recuerde que puede volver a editar esta tarea, mientras la fecha este habilitada')) {
      this.loading = "false";
      this.task.updatetaskready(this.valuew, this.photo.solution, this.photo.note, this.router.snapshot.paramMap.get('idtask') + '', this.photo.asistence, this.archivos[0])
        .subscribe((res: any) => {
          this.routerr.navigate([`/curso/${localStorage.getItem('idcurso') || ""}`]);
        });
      return false;
    }
    return false;
  }
}
