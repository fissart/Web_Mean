import {
    Component, OnInit, ViewChild, AfterViewInit,
    ElementRef
} from '@angular/core';
// @Componentimport SwiperCore from 'swiper/core';
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Title} from '@angular/platform-browser'
import { CurseService } from '../../services/curse.service'
import { UsersService } from '../../services/users.service'
import { TaskService } from '../../services/task.service'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxHeadroomOption } from 'ngx-headroom';
import SwiperCore, { EffectCoverflow, EffectFade, EffectFlip, Virtual, SwiperOptions , Swiper, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

SwiperCore.use([EffectCoverflow, EffectFade, EffectFlip, Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);




@Component({
    selector: 'app-photos-list',
    templateUrl: './photos-list.component.html',
    styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit, AfterViewInit {
    user = localStorage.getItem('id')
    rol = localStorage.getItem('rol')

    options = {
      "offset": 0,
      "tolerance": 0,
      "classes": {
        "initial": "animated",
        //"pinned": "flipInX",
        //"unpinned": "flipOutX"
        //"pinned": "bounceInDown",
        //"unpinned": "bounceOutUp"
        //"pinned": "swingInX",
        //"unpinned": "swingOutX"
        "pinned": "slideDown",
        "unpinned": "slideUp"
        }
      };

    public text: string = "";
    public year: number = 0;
    public texto: string = "";
    public textoimg: string = "";
    public idcurso: string = "";
    public iduserteach: string = "";
    public ussser: any = [];
    public photoSelected!: string | ArrayBuffer | null;
    public loading!: string;
    public nota: string = "";

    public califications: any = [];
    public archivos: any = [];
    public order: any = [];
    public _value: number = 0;

    get value(): number {
      return this._value;
    }
    set value(value: number) {
      if (!isNaN(value) && value <= 100) {
        this._value = value;
      }
    }
idnew!:string;
markdown!: string;
type!: string;
titlewww!: string;
imgwww!: string;
showww!: string;
shownews: boolean = false;
shownotes: boolean = false;
name: string = ""

    apiURL = environment.apiURL;

    photointeger: any = [];
    newws: any = [];
    CurseTeacher: any = [];
    integeruser: any = [];


    photouser: any = [];
    ww = [];

    readMore = false;
    longText = `This is long paragraph text containseverall words continued. An example for implementingdynamicallyy limit long text`;

    onImgError(event: any) {
        event.target.src = './assets/www_.jpg'
    }

    public isCollapsed = false;
    isReadMore = true

    showText() {
      this.isReadMore = !this.isReadMore
    }

    constructor(
        private CurseService: CurseService,
        private UserService: UsersService,
        private router: Router,
        private taskService: TaskService,
        private Tw: Title,
        private modal: NgbModal,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,

    ) {
        iconRegistry.addSvgIconLiteral('messenger', sanitizer.bypassSecurityTrustHtml(`
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 2 C 12.300781 2 2 11.601563 2 23.5 C 2 29.800781 4.898438 35.699219 10 39.800781 L 10 48.601563 L 18.601563 44.101563 C 20.699219 44.699219 22.800781 44.898438 25 44.898438 C 37.699219 44.898438 48 35.300781 48 23.398438 C 48 11.601563 37.699219 2 25 2 Z M 27.300781 30.601563 L 21.5 24.398438 L 10.699219 30.5 L 22.699219 17.800781 L 28.601563 23.699219 L 39.101563 17.800781 Z"/></svg>
`));
iconRegistry.addSvgIconLiteral('watsapp', sanitizer.bypassSecurityTrustHtml(`
<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100px" height="100px">    <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"/></svg>
`));
iconRegistry.addSvgIconLiteral('facebook', sanitizer.bypassSecurityTrustHtml(`
<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100px" height="100px">    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"/></svg>
`));
iconRegistry.addSvgIconLiteral('github', sanitizer.bypassSecurityTrustHtml(`
<svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"/>
</svg>

`));
iconRegistry.addSvgIconLiteral('tiktok', sanitizer.bypassSecurityTrustHtml(`
<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"/></svg>

`));
iconRegistry.addSvgIconLiteral('integrate', sanitizer.bypassSecurityTrustHtml(`
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 91.86" style="enable-background:new 0 0 122.88 91.86" xml:space="preserve"><style type="text/css"><![CDATA[
.st0{fill-rule:evenodd;clip-rule:evenodd;}
]]></style><g><path class="st0" d="M111.89,75.94l-6.59,6.59c-1.73,1.73-4.58,1.73-6.31,0l-5.31-5.31c-2.74,1.46-5.68,2.58-8.78,3.3v6.88 c0,2.45-2.01,4.46-4.46,4.46h-9.32c-2.45,0-4.46-2.01-4.46-4.46v-7.51c-3.04-0.92-5.91-2.23-8.54-3.89l-4.87,4.87 c-1.73,1.73-4.58,1.73-6.31,0l-2.98-2.97l0.08-0.09l13.07-14.96c4.78,5.6,11.9,9.16,19.84,9.16c14.4,0,26.08-11.68,26.08-26.07l0,0 l0,0c0-14.4-11.68-26.08-26.08-26.08c-7.21,0-13.74,2.93-18.46,7.66l-4.81-0.18L41.51,16.5c0.15-0.21,0.31-0.4,0.49-0.59l6.59-6.59 c1.73-1.73,4.58-1.73,6.31,0l5.31,5.31c2.74-1.47,5.68-2.59,8.78-3.3V4.45C69.01,2.01,71.02,0,73.47,0h9.31 c2.45,0,4.46,2.01,4.46,4.46l0,7.51c3.04,0.92,5.91,2.24,8.54,3.89l4.87-4.87c1.73-1.73,4.58-1.73,6.31,0l6.59,6.59 c1.73,1.73,1.73,4.58,0,6.31l-5.31,5.31c1.47,2.74,2.59,5.68,3.3,8.78h6.88c2.44,0,4.46,2.01,4.46,4.46v9.32 c0,2.45-2.01,4.46-4.46,4.46h-7.5c-0.92,3.04-2.23,5.91-3.89,8.54l4.87,4.87C113.63,71.36,113.63,74.2,111.89,75.94L111.89,75.94 L111.89,75.94L111.89,75.94L111.89,75.94z M77.03,37.46c4.68,0,8.47,3.79,8.47,8.47c0,4.68-3.79,8.47-8.47,8.47 c-4.68,0-8.47-3.79-8.47-8.47C68.56,41.25,72.36,37.46,77.03,37.46L77.03,37.46z M60.14,45.41L37.13,71.76L36.36,59.4 C20.63,57.15,8.58,61.47,0,73.87c0.1-24.4,15.96-37.16,34.82-39.12l-0.79-12.61L60.14,45.41L60.14,45.41L60.14,45.41L60.14,45.41 L60.14,45.41L60.14,45.41z"/></g></svg>
`));

iconRegistry.addSvgIconLiteral('instagram', sanitizer.bypassSecurityTrustHtml(`
<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg>
`));

                  iconRegistry.addSvgIconLiteral('youtube', sanitizer.bypassSecurityTrustHtml(`
                    <?xml version="1.0"?><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M 9 4 C 6.24 4 4 6.24 4 9 L 4 41 C 4 43.76 6.24 46 9 46 L 41 46 C 43.76 46 46 43.76 46 41 L 46 9 C 46 6.24 43.76 4 41 4 L 9 4 z M 15 8 L 17.400391 8 L 19 12 L 20.599609 8 L 23 8 L 20 15 L 20 19 L 18 19 L 18 14.990234 C 17.4 13.380234 15.41 9.01 15 8 z M 25 11 C 25.89 11 26.770078 11.269219 27.330078 11.949219 C 27.760078 12.439219 28 13.229531 28 14.269531 L 28 15.730469 C 28 16.770469 27.800859 17.490469 27.380859 17.980469 C 26.820859 18.650469 25.89 19 25 19 C 24.11 19 23.200625 18.650469 22.640625 17.980469 C 22.210625 17.490469 22 16.770469 22 15.730469 L 22 14.279297 C 22 13.239297 22.229922 12.439219 22.669922 11.949219 C 23.229922 11.269219 23.99 11 25 11 z M 29 11 L 31 11 L 31 17 C 31.05 17.27 31.339375 17.390625 31.609375 17.390625 C 32.019375 17.390625 32.54 16.910859 33 16.380859 L 33 11 L 35 11 L 35 19 L 33 19 L 33 17.619141 C 32.19 18.409141 31.499844 19.000703 30.589844 18.970703 C 29.929844 18.950703 29.470234 18.710469 29.240234 18.230469 C 29.100234 17.950469 29 17.499844 29 16.839844 L 29 11 z M 25 12.619141 C 24.8625 12.619141 24.730859 12.649297 24.611328 12.701172 C 24.491797 12.753047 24.383594 12.827422 24.292969 12.919922 C 24.202344 13.012422 24.128906 13.122266 24.078125 13.244141 C 24.027344 13.366016 24 13.500625 24 13.640625 L 24 16.449219 C 24 16.729219 24.111719 16.984922 24.292969 17.169922 C 24.383594 17.262422 24.491797 17.336797 24.611328 17.388672 C 24.730859 17.440547 24.8625 17.470703 25 17.470703 C 25.1375 17.470703 25.269141 17.440547 25.388672 17.388672 C 25.747266 17.233047 26 16.869219 26 16.449219 L 26 13.640625 C 26 13.080625 25.55 12.619141 25 12.619141 z M 24.990234 22 L 25.009766 22 C 25.009766 22 31.719219 22.000312 36.199219 22.320312 C 36.829219 22.390313 38.190156 22.400391 39.410156 23.650391 C 40.370156 24.590391 40.679688 26.75 40.679688 26.75 C 40.679688 26.75 41 28.280547 41 30.810547 L 41 33.179688 C 41 35.709688 40.679688 37.240234 40.679688 37.240234 C 40.679688 37.240234 40.370156 39.399844 39.410156 40.339844 C 38.190156 41.589844 36.829219 41.599922 36.199219 41.669922 C 31.719219 41.989922 25 42 25 42 C 25 42 16.679141 41.919688 14.119141 41.679688 C 13.409141 41.549687 11.809844 41.589609 10.589844 40.349609 C 9.6298437 39.399609 9.3203125 37.240234 9.3203125 37.240234 C 9.3203125 37.240234 9 35.709688 9 33.179688 L 9 30.810547 C 9 28.280547 9.3203125 26.75 9.3203125 26.75 C 9.3203125 26.75 9.6298438 24.590391 10.589844 23.650391 C 11.809844 22.400391 13.170781 22.390312 13.800781 22.320312 C 18.280781 22.000312 24.990234 22 24.990234 22 z M 12 26 L 12 27.978516 L 14 27.978516 L 14 38 L 16 38 L 16 27.978516 L 18 27.978516 L 18 26 L 12 26 z M 25 26 L 25 38 L 27 38 L 27 36.75 C 27.631 37.531 28.453 38 29.125 38 C 29.877 38 30.533156 37.595313 30.785156 36.820312 C 30.904156 36.401313 30.992 36.01 31 35.125 L 31 32.375 C 31 31.387 30.866234 30.642656 30.740234 30.222656 C 30.488234 29.441656 29.878 29.005 29.125 29 C 28.145 28.993 27.75 29.5 27 30.375 L 27 26 L 25 26 z M 18 29 L 18 35.685547 C 18 36.407547 18.100469 36.891984 18.230469 37.208984 C 18.450469 37.722984 18.899062 38 19.539062 38 C 20.269062 38 21.21 37.485766 22 36.634766 L 22 38 L 24 38 L 24 29 L 22 29 L 22 35.269531 C 21.56 35.853531 20.919531 36.289062 20.519531 36.289062 C 20.259531 36.289062 20.05 36.179578 20 35.892578 L 20 29 L 18 29 z M 35.029297 29 C 34.021297 29 33.234063 29.317016 32.664062 29.916016 C 32.244062 30.358016 32 31.080578 32 32.017578 L 32 35.083984 C 32 36.014984 32.2685 36.666516 32.6875 37.103516 C 33.2585 37.702516 34.044172 38 35.076172 38 C 36.107172 38 36.918844 37.686781 37.464844 37.050781 C 37.704844 36.769781 37.858781 36.453563 37.925781 36.101562 C 37.943781 35.942563 38 35.511 38 35 L 36 35 L 36 35.798828 C 36 36.262828 35.552 36.638672 35 36.638672 C 34.448 36.638672 34 36.261828 34 35.798828 L 34 34 L 38 34 L 38 33.423828 L 38 31.978516 C 38 31.043516 37.770422 30.359016 37.357422 29.916016 C 36.804422 29.317016 36.019297 29 35.029297 29 z M 35 30.447266 C 35.552 30.447266 36 30.824109 36 31.287109 L 36 32.615234 L 34 32.615234 L 34 31.287109 C 34 30.823109 34.448 30.447266 35 30.447266 z M 28.220703 30.746094 C 28.765703 30.746094 29 31.081 29 32.125 L 29 34.875 C 29 35.919 28.765703 36.279297 28.220703 36.279297 C 27.909703 36.279297 27.316 36.066 27 35.75 L 27 31.375 C 27.316 31.063 27.909703 30.746094 28.220703 30.746094 z"/></svg>
  `));

  iconRegistry.addSvgIconLiteral('getout', sanitizer.bypassSecurityTrustHtml(`
  <svg
     version="1.1"
     id="Layer_1"
     x="0px"
     y="0px"
     viewBox="0 0 122.88 91.86"
     style="enable-background:new 0 0 122.88 91.86"
     xml:space="preserve"
     sodipodi:docname="integration.svg"
     inkscape:version="1.1 (c68e22c387, 2021-05-23)"
     xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
     xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:svg="http://www.w3.org/2000/svg"><defs
       id="defs11" /><sodipodi:namedview
       id="namedview9"
       pagecolor="#ffffff"
       bordercolor="#666666"
       borderopacity="1.0"
       inkscape:pageshadow="2"
       inkscape:pageopacity="0.0"
       inkscape:pagecheckerboard="0"
       showgrid="false"
       showguides="true"
       inkscape:snap-global="false"
       inkscape:zoom="2.0129373"
       inkscape:cx="28.813615"
       inkscape:cy="12.171268"
       inkscape:window-width="1366"
       inkscape:window-height="705"
       inkscape:window-x="-8"
       inkscape:window-y="-8"
       inkscape:window-maximized="1"
       inkscape:current-layer="Layer_1" /><style
       type="text/css"
       id="style2"><![CDATA[
  	.st0{fill-rule:evenodd;clip-rule:evenodd;}
  ]]></style><path
       class="st0"
       d="m 111.89,75.94 -6.59,6.59 c -1.73,1.73 -4.58,1.73 -6.31,0 L 93.68,77.22 C 90.94,78.68 88,79.8 84.9,80.52 v 6.88 c 0,2.45 -2.01,4.46 -4.46,4.46 h -9.32 c -2.45,0 -4.46,-2.01 -4.46,-4.46 V 79.89 C 63.62,78.97 60.75,77.66 58.12,76 l -4.87,4.87 c -1.73,1.73 -4.58,1.73 -6.31,0 L 43.96,77.9 40.710934,74.62166 40.729728,62.519196 57.11,62.85 c 4.78,5.6 11.9,9.16 19.84,9.16 14.4,0 26.08,-11.68 26.08,-26.07 v 0 0 c 0,-14.4 -11.68,-26.08 -26.08,-26.08 -7.21,0 -13.74,2.93 -18.46,7.66 l -17.869498,-0.336159 0.0073,-9.840644 C 40.777763,17.133197 41.82,16.1 42,15.91 l 6.59,-6.59 c 1.73,-1.73 4.58,-1.73 6.31,0 l 5.31,5.31 c 2.74,-1.47 5.68,-2.59 8.78,-3.3 V 4.45 C 69.01,2.01 71.02,0 73.47,0 h 9.31 c 2.45,0 4.46,2.01 4.46,4.46 v 7.51 c 3.04,0.92 5.91,2.24 8.54,3.89 l 4.87,-4.87 c 1.73,-1.73 4.58,-1.73 6.31,0 l 6.59,6.59 c 1.73,1.73 1.73,4.58 0,6.31 l -5.31,5.31 c 1.47,2.74 2.59,5.68 3.3,8.78 h 6.88 c 2.44,0 4.46,2.01 4.46,4.46 v 9.32 c 0,2.45 -2.01,4.46 -4.46,4.46 h -7.5 c -0.92,3.04 -2.23,5.91 -3.89,8.54 l 4.87,4.87 c 1.73,1.73 1.73,4.57 -0.01,6.31 z M 77.03,37.46 c 4.68,0 8.47,3.79 8.47,8.47 0,4.68 -3.79,8.47 -8.47,8.47 -4.68,0 -8.47,-3.79 -8.47,-8.47 0,-4.68 3.8,-8.47 8.47,-8.47 z"
       id="path4"
       sodipodi:nodetypes="sssccssssccscccccsscssccccsscccsssccssssccssssccsssssss" /><path
       class="st0"
       d="m 12.18387,45.037867 24.590594,24.881427 0.0066,-12.38396 21.993998,0.447951 0.131757,-24.960961 -22.108243,-0.185036 0.01115,-12.634717 z"
       id="path4-2"
       sodipodi:nodetypes="cccccccc"
       style="clip-rule:evenodd;fill-rule:evenodd" /></svg>
  `));
          iconRegistry.addSvgIconLiteral('go', sanitizer.bypassSecurityTrustHtml(`
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 80.98" style="enable-background:new 0 0 122.88 80.98" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M100.66,40.49L60.58,80.98V60.81C35.23,55.56,15.21,61.35,0,80.63c2.64-39.65,29.73-58.78,60.58-60.05V0 L100.66,40.49L100.66,40.49z M122.88,40.49L82.79,80.98V68.04l27.28-27.55L82.79,12.94V0L122.88,40.49L122.88,40.49z"/></g></svg>
  `));

          iconRegistry.addSvgIconLiteral('blogspot', sanitizer.bypassSecurityTrustHtml(`
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 9 4 C 6.239 4 4 6.239 4 9 L 4 41 C 4 43.761 6.239 46 9 46 L 41 46 C 43.761 46 46 43.761 46 41 L 46 9 C 46 6.239 43.761 4 41 4 L 9 4 z M 20 12 L 25 12 C 29.42 12 33.033 15.632547 33 20.060547 C 32.991 21.141547 33.919 22 35 22 L 36 22 C 37.105 22 38 22.895 38 24 L 38 30 C 38 34.4 34.4 38 30 38 L 20 38 C 15.6 38 12 34.4 12 30 L 12 25 L 12 20 C 12 15.6 15.6 12 20 12 z M 20 18 C 18.9 18 18 18.9 18 20 C 18 21.1 18.9 22 20 22 L 25 22 C 26.1 22 27 21.1 27 20 C 27 18.9 26.1 18 25 18 L 20 18 z M 20 28 C 18.9 28 18 28.9 18 30 C 18 31.1 18.9 32 20 32 L 30 32 C 31.1 32 32 31.1 32 30 C 32 28.9 31.1 28 30 28 L 20 28 z"/></svg>
  `));
    }


  htmlText ="<p>Testing</p>"

  onContentChanged =  (event: any) =>{
     this.froala=event.html;
    console.log(this.froala);

   }
 onSelectionChanged = (event:any, user_id:string, name:string, correo:string, password:string, rol:string, celular:string, carrera:string, mension:string, ciclo:string, sexo:string, dni:string) => {
  if(event.oldRange == null){
    //this.onFocus();
  }
  if(event.range == null){
   //this.onBlur();
   console.log( event.target.innerHTML);
   this.UserService.updatePhoto(user_id, name, correo, password, rol, celular, carrera, mension, ciclo, sexo, dni, event.target.innerHTML,  this.archivos[0])
       .subscribe((res: any) => {
       });
  }
}

  onFocus = () =>{
    console.log("On Focus");
  }
  onBlur = () =>{
    console.log("Blurred");
  }

config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,
    loop:true,
    //effect:'flip',
    //effect:'fade',
    //effect:'coverflow',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
    //  centeredSlides:true,
    //  navigation:true,
    autoplay:{delay: 2000,
    disableOnInteraction: true},
    //pagination: { clickable: true, type: 'progressbar'},
    //scrollbar: { draggable: true },
};

capturandoFile(event: any) {
  const ww = event.target.files[0];
  this.archivos = [];//resetea la matriz a rango 1
  this.archivos.push(ww);
  //console.log(event.target.files);
  if (event.target.files[0]) {
    this.type = event.target.files[0].type;
    this.name = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(event.target.files[0]);
  }
}



//ussser:  any = [];

typefile: string=""

FileCurse:  any = [];


FileCursse(event: any) {
  const ww = event.target.files[0];
  this.FileCurse = [];//resetea la matriz a rango 1
  this.FileCurse.push(ww);
  if (event.target.files[0]) {
    console.log(event.target.files[0]);
    this.type = event.target.files[0].type
    this.name = event.target.files[0].name
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.ussser_id, this.name, this.typefile, this.FileCurse[0]);
    this.CurseService.filecurse(this.ussser_id, this.name, this.typefile, "codigo", this.FileCurse[0])
    .subscribe((res: any) => {
      this.loading = "false";
      this.value = Math.round((100 / res.total) * res.loaded);
      console.log(res.total);
      console.log(res.loaded);
      if (res.total == res.loaded && res.type > 0) {
          this.usser();
          this.value=0;
      }

    })

  }
}


FileCursedelete(id: string) {
  if (window.confirm('Desea eliminar archivo?')) {
  this.CurseService.filecursedelete(id)
  .subscribe((res: any) => {
    this.usser();
  })
}
}

ussser_id:string="";

Type(www:string, wwwww:string){
this.typefile=www;
this.ussser_id=wwwww;
}

openfile(file: any, textw: string) {
    this.modal.open(file, { size: 'xl', scrollable: true })
    this.text = textw;

}

@ViewChild('new') w: ElementRef | undefined;
//closeResult = '';

    ngAfterViewInit(): void {
      //  this.open(this.w, "wwwwwwwww ww");
    }

    open(content: any) {
      this.modal.open(content, { size: 'lg', scrollable: true })
      }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

getintegersuser()
{
     this.CurseService.getcurseuseronly(localStorage.getItem('id') || "").subscribe(
            (res: any) => {
                this.photointeger = res;
                console.log(res, "getcurseuseronly");
            },
            err => console.log(err)
        )
}

getsCurseTeacher()
{
     this.CurseService.getsCurseTeacher(localStorage.getItem('id') || "").subscribe(
            (res: any) => {
                this.CurseTeacher = res[0].curses;
                console.log(res, "getsCurseTeacher");
            },
            err => console.log(err)
        )
}

gets_news(){
  this.CurseService.Getnews(localStorage.getItem('id') || "")
  .subscribe((res:any) => {
    console.log(res, "ww_w");
    this.newws = res;
    function www(taskss: any){
      for (const file of res) {
          if(file.show=='true'){
         var texto=file.user;
         return {w1:file.title,w2:file.description, w3:file.img};
         return texto;
          }
          };
    }

    //www(res);
    if(www(res)){
    this.text=www(res).w1;
    this.texto=www(res).w2;
    this.textoimg=www(res).w3;
    this.open(this.w);
    }
  },
err => console.log(err)
);
}


getnews(){
  this.CurseService.Getnews(localStorage.getItem('id') || "")
  .subscribe((res:any) => {
    console.log(res, "news");
    this.newws = res;
  }
);
}


getcalificationsuser(){
  this.CurseService.GetCalificationsuser(localStorage.getItem('id') || "")
  .subscribe((res:any) => {
    console.log(res, "GetCalificationsuser");
    this.califications = res;
  }
);
}
getcursesteacher(){
this.loading = "false";
this.CurseService.getPhotosUser(localStorage.getItem('id') || "").subscribe(
    (res: any) => {
        this.integeruser = res;
        console.log(res, "getcursesteacher")
        this.loading = "";
    },
    err => console.log(err)
)
}

froala:string="www"

usser(){
this.UserService.getUser()
  .subscribe(
    (res: any) => {
      this.ussser = res[0];
      this.froala = res[0].filosophy;

    console.log(res)
     },
    err => console.log(err)
  );
}

getFirstAverages(ciclo:HTMLInputElement, mension:HTMLInputElement, year:HTMLInputElement){
  this.loading="false";
  this.CurseService.getFirstAverages(ciclo.value, mension.value, year.value)
    .subscribe(
      (res: any) => {
        this.order = res
        this.loading=""
      console.log(res, "getFirstController")
              //localStorage.setItem('imguser', res.foto);
      },
      err => console.log(err)
    );
}

    ngOnInit() {

      this.year = new Date().getFullYear();
      this.Tw.setTitle('Inicio ESFAP');

      if (localStorage.getItem('id')) {
        this.usser();
      }
      this.gets_news();
      //this.getintegersuser();
      if(localStorage.getItem('rol')=="1" || localStorage.getItem('rol')=="2"){
      this.getsCurseTeacher()
      }
      if(localStorage.getItem('rol')=="3"){
      this.getcalificationsuser()
      this.getintegersuser()
    }

    }

    goCurse(id: string) {
        this.router.navigate(['/curso', id]);
    };

    selectedCard(id: string) {
        this.router.navigate(['/photos', id]);
        console.log(id);
    };

    openwww(w: any, title: string, description: string, img: string) {
    //console.log(this.idnew,this.title,this.markdown,this.show,this.img);

        this.modal.open(w, { size: 'lg', scrollable: true })
        this.text=title;
        this.texto=description;
        this.textoimg=img;
    }

    open1(ww: any, idcurso: string, iduser: string) {
        this.modal.open(ww, { size: 'lg', scrollable: true })
        this.idcurso = idcurso;
        this.iduserteach = iduser;
    }

    open2(www: any, idnew: string, title: string, description: string, img: string, show: string) {
//console.log(this.idnew,this.title,this.markdown,this.show,this.img);

        this.modal.open(www, { size: 'xl', scrollable: false })
        this.idnew = idnew;
        this.titlewww = title;
        this.markdown = description;
        this.imgwww = img;
        this.showww = show;
    }


shownewwws(){
  if(!this.shownews){
    this.shownews=true
  }else{
    this.shownews=false
  }
}

showcalifications(){
  if(!this.shownotes){
    this.shownotes=true
  }else{
    this.shownotes=false
  }
}

    integer(codeww: HTMLInputElement) {
        //console.log(codeww.value.length>=24)
        if (codeww.value.length==24 ) {
            this.CurseService.saveinteger(localStorage.getItem('id') || "", codeww.value, this.iduserteach, "this.curse.codigo")
                .subscribe(
                    (res:any) => {
                            this.loading = "false";
                        if(res.msgok){
                            console.log(res);
                            this.CurseService.getPhotosUser(localStorage.getItem('id') || "").subscribe(
                            (res: any) => {
                                this.integeruser = res;
                                console.log(res)
                                this.loading = "";

                                this.modal.dismissAll();
                            },
                            err => console.log(err)
                        )
                    }else{
                        alert(res.msg)
                        this.loading = "";

                    }


        this.getintegersuser();

                    },
                    err => console.log(err)
                );

            return false;
        } else {
            alert("Código incorrecto")
            return true;
        }
    };

    deleteinteger(id: string) {
        if (window.confirm('Desea salir del curso?')) {
            this.CurseService.deleteinteger(id)
                .subscribe(res => {
                    console.log(res);
                    alert("Ok eliminado del curso, elimine otro. Si desea visualizar resultados actualice la página")
                });
        }
    };

    createnews() {
            this.CurseService.newscreate(localStorage.getItem('id') || "")
                .subscribe(res => {
                    console.log(res);
                    this.getnews();
                });

    };

    updatenews(title: HTMLInputElement, description: HTMLTextAreaElement, show: HTMLInputElement ) {
            this.CurseService.newsupdate(this.idnew, title.value, description.value, show.value, this.archivos[0])
                .subscribe((res: any)  => {
                  this.loading = "false";
                  this.value = Math.round((100 / res.total) * res.loaded);
                  console.log(res.total);
                  console.log(res.loaded);
                  if (res.total == res.loaded && res.type > 0) {
//                         this.routerr.navigate([`/curso/${localStorage.getItem('idcurso') || ""}`]);
                    this.modal.dismissAll();
                    //console.log(res);
                    //this.routerr.navigate([`/curso/${localStorage.getItem('idcurso') || ""}`]);
                    this.getnews();
                    this.loading = "";
                    this._value=0;
                    this.name="";
                    this.archivos = [];//resetea la matriz a rango 1
                    //this.photoSelected= [];
                  }
                });
                return false;
    };

    deletenews(idnew:string) {
      if (window.confirm('Desea borrar esta información?')) {
            this.CurseService.newsdelete(idnew)
                .subscribe(res => {
                    console.log(res);
                    this.getnews();
                });
}

    };

    newsemergent(idnew:string, show:string) {
            this.CurseService.showhidenews(idnew, show)
                .subscribe(res => {
                    console.log(res);
                    this.getnews();
                });

    };



    delete_average(id: string) {
        if (window.confirm('Desea borrar registro de nota?')) {
      this.taskService.delete_average(id)
          .subscribe(
              (res:any) => {
                alert("Ok deleted")
                //this.getIntegeraverage()
              },
              err => console.log(err)
          );
        }
      return false;
}
onBlurMean(event:any, codigo: string, user: string, title: string, ciclo: string, credito: string, especialidad: string) {
        this.loading = "false";
      if(event.target.value<=20 && event.target.value>0 || event.target.value=="R"  || event.target.value=="L"){
console.log(event.target.value=='L');

        if(event.target.value=='L'){
        this.nota="-0";
        }
        if(event.target.value=='R' || event.target.value=='0'){
          this.nota="0";
        }
        if(event.target.value>0){
            this.nota=event.target.value;
        }
        //console.log(this.nota, user, user, user, title, ciclo, credito, especialidad)//curse ciclo carrera year user nombre

        this.taskService.create_average(this.nota, codigo, user, user, user, title, ciclo, credito, especialidad, this.year)//curse ciclo carrera year user nombre
            .subscribe((res: any) => {
              this.loading = "";
              //this.getIntegeraverage();
            });
            return false;
      }else{
        this.loading = "";
          //this.getIntegeraverage();
        alert("La calificación es vigesimal, L : Licencia o R : Retirado")
        return false;
      }

      }

      onBlurMeanUpdate(event:any, id: string) {
        if(event.target.value<=20&&event.target.value>0 || event.target.value=="R"  || event.target.value=="L" || event.target.value=="-0"){
          if(event.target.value=='L' || event.target.value=="-0"){
          this.nota="-0";
          }
          if(event.target.value=='R' || event.target.value=='0'){
            this.nota="0";
          }
          if(event.target.value>0){
              this.nota=event.target.value;
          }
          this.taskService.update_average(id, this.nota)
                .subscribe((res: any) => {
                //  this.getIntegeraverage()
                });
          return false;
        }else{
          alert("La calificación es vigesimal mayor a 0, L : Licencia o R : Retirado")
           this.name = ' ';
            // this.getIntegeraverage();
          return false;
        }

      }

      onBlurFilosophyUpdate(event:any, id: string) {
      console.log(event.target.value);
console.log(id);
this.CurseService.filecurseupdate(id, event.target.value)
.subscribe((res: any) => {
  this.usser();
})
}

onBlurFilosophy(event:any, user_id:string, name:string, correo:string, password:string, rol:string, celular:string, carrera:string, ciclo:string, sexo:string, dni:string) {
//console.log(this.froala);
console.log(user_id, name, correo, password, rol, celular, carrera, ciclo, sexo, dni, this.froala,  this.archivos[0]);
this.UserService.updatePhoto(user_id, name, correo, password, rol, celular, carrera, '', ciclo, sexo, dni, event.target.value,  this.archivos[0])
    .subscribe((res: any) => {
    });
return false;
}


onblur(event:any){
  console.log(event.target.innerHTML);

}

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.photointeger, event.previousIndex, event.currentIndex);
    }
}

/*

<div class="h3 text-center">Escuela Superior de
Formación Artística Pública “Felipe Guamán Poma de Ayala”
<hr>
<img  src="http://169.197.183.233:3000/uploads/negz.jpg" width="20%"
/>
<hr>


<p class="h5 text-center">Mg. Ricardo
Michel MALLQUI BAÑOS
</p>

<p class="h5 text-center">ARTISTA
PROFESIONAL, ESPECIALIDAD ARTES PLÁSTICAS Y VISUALES, MENCIÓN ESCULTURA
</p></div>

<hr>
<div class="h6 border border-warning p-1">
<h1 class='bg-info p-1 mb-1'>
FILOSOFÍA DEL DOCENTE
</h1>
<div class="h6 bg-light p-1">
Mi filosofía docente se ha ido formando y evolucionando a lo largo de mi experiencia en las aulas. Como reflejo de esta experiencia y de mi aprendizaje, hay cuatro objetivos fundamentales en mi forma de enseñar:

<div>
<ol>
<li>El alumno siempre debe ser el centro del aprendizaje.</li>
<li>La enseñanza debe ser individualizada y adaptada a cada estilo de aprendizaje.</li>
<li>La motivación debe estar presente de forma continua en el aula.</li>
<li>El aprendizaje dentro del aula tiene que tener relación con la vida y realidad de los alumnos.</li>
</ol>
</div>

Para conseguir estos cuatro objetivos aplico distintas metodologías en mi aula: aprendizaje cooperativo, aprendizaje basado en proyectos, gamificación, CLIL, incorporación de las TIC's.

<hr />
- Aprendizaje Cooperativo: trabajando a través de esta metodología, el rol del profesor cambia de ser un mero comunicador de conocimientos a ser un guía en el aprendizaje de los alumnos. Las sesiones siguen contando con una pequeña parte de lo que hoy en día está tan de moda llamar "clase magistral", pues ciertas explicaciones de contenidos teóricos por parte del profesor siguen siendo necesarias. Sin embargo estas "explicaciones magistrales" son solo una pequeña parte de las sesiones. El resto del tiempo es dedicado a que los alumnos trabajen, se cuestionen dudas entre ellos, se las resuelvan, aprendan los unos de los otros, y por supuesto cuenten con la ayuda del profesor cuando la necesiten. Esta metodología también favorece a adaptar y diversificar el aprendizaje y a incluir a todo tipo de alumnado dentro de la clase.
<hr />

- Aprendizaje Basado en Proyectos: esta metodología es la perfecta para contextualizar el aprendizaje. Enseñando Matemáticas es muy común encontrarse a diario con la pregunta de los alumnos de: ¿Y esto para qué sirve?. Los proyectos son la mejor herramienta para que esta pregunta quede respondida mientras aprenden. Se trata de buscar aplicaciones de esos contenidos teóricos que aprenden en el aula, relacionarlos con otras materias y darles una utilidad. Además los alumnos aprenden a trabajar en equipo, a realizar investigaciones, desarrollan sus destrezas comunicativas, se les da una motivación y un claro objetivo de lo que queremos que aprendan.  Otro beneficio de los proyectos es que suelen contener desempeños de distinto tipo, lo cuál hace que los alumnos puedan poner en práctica sus destrezas en los distintos tipo de inteligencias múltiples que poseen, y que todos los miembros del grupo tengan siempre algo que aportar.
<hr />
- Gamificación ¿A quién no le gusta jugar a juegos? ¿Quién no ha aprendido cosas nuevas jugando? Desde mi punto de vista la gamificación es una metodología que engloba todas las desarrolladas en mi actividad docente. Es la mejor herramienta para motivar y enganchar a los alumnos en el aprendizaje. Se crea una narrativa de la que ellos son protagonistas (ellos son el centro del aprendizaje). En esa narrativa aparece una situación problemática que ellos deberán resolver (anda, como en el Aprendizaje Basado en Problemas), según van avanzando en su aprendizaje y superando los retos del juego van ganando puntos (les vamos evaluando su aprendizaje). Están motivados, se divierten aprendiendo y no les cuesta tanto como en otro tipo de situaciones porque tienen un objetivo claro y se lo están pasando bien, encuentran una utilidad a lo que aprenden, y el aprendizaje lo asocian a emociones (Educación Emocional) por lo que no es algo que memorizan para un examen y luego olvidan, sino que es asimilado por el alumno. La gamificaicón te permite individualizar la enseñanza, puedes crear retos distintos según el nivel de cada alumno, exactamente igual que un videojuego. También favorece el sentido de pertenencia a un grupo y aumenta sus destrezas colaborativas y cooperativas.

<hr />
- Incorporación de las TIC's: como profesor de TIC's. Estoy siempre al día de lo último en herramientas Web 2.0 que se pueden incorporar a las distintas materias que imparto. Es muy importante que nos demos cuenta de que tenemos alumnos tecnológicos que prácticamente viven pegados a esa tecnología. Si en el aula les separamos de esa realidad, de nuevo estamos descontextualizando el aprendizaje. Aunque de nuevo es necesario un equilibrio entre el uso de la tecnología en el aula y el de otras herramientas no tecnológicas. El uso de la tecnología dentro del aula también ayuda al alumnado a trabajar de forma colaborativa y a prepararse para su futuro, ya que ahora mismo en cualquier trabajo es necesario unos conocimientos mínimos sobre esta, y según vamos avanzando en el tiempo cada vez más.

</div>

<h1 class='bg-info p-1 mb-1'>
ASIGNATURA A CARGO
</h1>


<ol class="mb-0">
<li>MATEMÁTICAS</li>
<li>MATEMÁTICAS APLICADAS AL ARTE</li>
<li>TALLER PRINCIPAL ESCULTURA III y VII</li>
<li>FRACTALES Y ARTE</li>
</ol>

</div>
*/
