import { Component } from '@angular/core';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;
  apiURL = environment.apiURL;

   public favIcon=document.querySelector('#www') as HTMLLinkElement;

  changeIcon() {
  }
  public src: string = "";
  
  ngOnInit() {
    var month = new Date().getMonth()
    this.src = 'www' + (month + 1)
  
    console.log('www change'); 
    this.favIcon.href  = 'assets/www' + (month + 1)+'.svg';//assets/www3.svg
  }
  /* constructor() {
    console.log(environment.apiURL); // Logs false for default environment
  }
// */
}
