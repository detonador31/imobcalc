import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  currentSlideIndex: number = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  finishTutorial() {
    localStorage.setItem('tutorialComplete', 'true');
    this.modalCtrl.dismiss();
  }

  async checkLastSlide() {
    // Aqui você pode verificar qual slide está ativo (opcional)
  }

  async slideChanged() {
    this.currentSlideIndex = await this.slides.getActiveIndex();
    console.log('Slide atual:', this.currentSlideIndex);
  }

}
