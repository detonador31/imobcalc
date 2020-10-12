import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-options-offline',
  templateUrl: './options-offline.page.html',
  styleUrls: ['./options-offline.page.scss'],
})
export class OptionsOfflinePage implements OnInit {

  constructor(
    public router: Router,
    private navCtr: NavController,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
  }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['./home']);
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    this.router.navigate(['/home']);
  }

}
