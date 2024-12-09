import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class BarColorService {
  constructor(private platform: Platform) {}

  async setColors(statusBarColor: string, navigationBarColor?: string) {
    if (this.platform.is('capacitor')) {
      // Alterar a cor da Status Bar
      await StatusBar.setBackgroundColor({ color: statusBarColor });

      // Alterar a cor da Navigation Bar (se necessário)
      if (navigationBarColor) {
        const win = window as any;
        if (win.AndroidNavigationBar) {
          win.AndroidNavigationBar.setColor(navigationBarColor); // Comunicação com o Android manual
        }
      }
    }
  }
}
