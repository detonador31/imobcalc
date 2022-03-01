import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(
    private router: Router    
  ) { }

  ngOnInit() {
  }

/**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
 backPage() {
  //this.navCtr.back();
  this.router.navigate(['']);
}  

onToggleEvent(event) {
  if(event.detail.checked) {
    document.body.setAttribute('color-theme', 'dark');
  } else {
    document.body.setAttribute('color-theme', 'light');
  }
}

}
