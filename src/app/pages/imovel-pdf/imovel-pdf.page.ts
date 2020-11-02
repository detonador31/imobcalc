import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-imovel-pdf',
  templateUrl: './imovel-pdf.page.html',
  styleUrls: ['./imovel-pdf.page.scss'],
})
export class ImovelPdfPage implements OnInit {
  
  @ViewChild(IonList, {read: ElementRef, static: true}) list: ElementRef;
  arr = [];

  block = 'start';
  behavior = 'auto';

  scrollTo = null;

  constructor() { 
    for (let val = 0; val < 100 ; val++){
      this.arr.push(`Elemento - ${val}`);
    }
  }


  ngOnInit() {
  }

  scrollListVisible() {
    console.log('Scroll to:', this.scrollTo);
    let arr = this.list.nativeElement.children;
    console.log(arr);
    let item = arr[this.scrollTo];
    console.log(item);
    item.scrollIntoView({
      behavior: this.behavior,
      block: this.block
    });
  }

}
