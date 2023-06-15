import { Injectable } from '@angular/core';
import { UtilService } from '../util-service'; 
import { ToastController } from '@ionic/angular';
import { AdMob, AdMobBannerSize, AdMobRewardItem, BannerAdOptions, BannerAdPluginEvents, BannerAdSize,
  RewardAdOptions, AdOptions, InterstitialAdPluginEvents, RewardAdPluginEvents, BannerAdPosition } from '@capacitor-community/admob';
import { ReplaySubject } from 'rxjs';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Plugins, PluginListenerHandle } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class AdmobService implements OnInit, OnDestroy {


  public readonly bannerSizes: BannerAdSize[] = Object.keys(BannerAdSize) as BannerAdSize[];
  public currentBannerSize?: BannerAdSize;
  public bsize: BannerAdSize.BANNER;
  public bIds: UtilService = new UtilService();

  private readonly lastBannerEvent$$ = new ReplaySubject<{name: string, value: any}>(1);
  public readonly lastBannerEvent$ = this.lastBannerEvent$$.asObservable()

  private readonly lastRewardEvent$$ = new ReplaySubject<{name: string, value: any}>(1);
  public readonly lastRewardEvent$ = this.lastRewardEvent$$.asObservable()

  private readonly lastInterstitialEvent$$ = new ReplaySubject<{name: string, value: any}>(1);
  public readonly lastInterstitialEvent$ = this.lastInterstitialEvent$$.asObservable()

  private readonly listenerHandlers: PluginListenerHandle[] = [];
  /**
   * Height of AdSize
   */
  private appMargin = 0;
  private bannerPosition: 'top' | 'bottom';  

  /**
   * For ion-item of template disabled
   */
   public isPrepareBanner = false;
   public isPrepareReward = false;
   public isPrepareInterstitial = false;
 
   public isLoading = false;  



  ngOnDestroy() {
  }


  constructor(
    private readonly toastCtrl: ToastController,
    private readonly ngZone: NgZone
  ) {
  }

  async ngOnInit() {
  }

 /**
   * ==================== BANNER =======================================================================================
   */
  async showTopBanner() {

    const bannerOptions: BannerAdOptions = {
      adId: this.bIds.adMobId.android.banner,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.TOP_CENTER,
      margin: 0,
      isTesting: true
      //npa: true
    };

    await this.showBanner(bannerOptions);
  }

  async showBottomBanner() {
    const bannerOptions: BannerAdOptions = {
      adId: this.bIds.adMobId.android.banner,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: this.bIds.adMobId.android.testing
      //npa: true
    };

    await this.showBanner(bannerOptions);
  }

  private async showBanner(options: BannerAdOptions): Promise<void> {
    const bannerOptions: BannerAdOptions = { ...options, adSize: this.currentBannerSize };
    console.log('Requesting banner with this options', bannerOptions);

    const result = await AdMob.showBanner(bannerOptions).
      catch(e => console.error(e));
    
    if (result === undefined) {
      return;
    }

    this.isPrepareBanner = true;
  }



  async hideBanner() {
    const result = await AdMob.hideBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginTop = '0px';
    app.style.marginBottom = '0px';
  }

  async resumeBanner() {
    const result = await AdMob.resumeBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginBottom = this.appMargin + 'px';
  }

  async removeBanner() {
    const result = await AdMob.removeBanner()
      .catch(e => console.log(e));
    if (result === undefined) {
      return;
    }

    const app: HTMLElement = document.querySelector('ion-router-outlet');
    app.style.marginBottom = '0px';
    this.appMargin = 0;
    this.isPrepareBanner = false;
  }
  /**
   * ==================== /BANNER END -===============================================================================================
   */

  /**
   * ==================== REWARD START ================================================================================================
   */
  async prepareReward() {

    const options: RewardAdOptions = {
      adId: this.bIds.adMobId.android.reward,
      isTesting: this.bIds.adMobId.android.testing
      // npa: true
      // ssv: {
      //   userId: "A user ID to send to your SSV"
      //   customData: JSON.stringify({ ...MyCustomData })
      //}
    };

    try {
      const result = await AdMob.prepareRewardVideoAd(
        options
      );
      console.log('Reward prepared', result);
      this.isPrepareReward = true;
      this.showReward();
    } catch (e) {
      console.error('There was a problem preparing the reward', e);
    } finally {
      this.isLoading = false;
    }
  }

  async showReward() {
    const result: AdMobRewardItem = await AdMob.showRewardVideoAd()
      .catch(e => undefined);
    if (result === undefined) {
      return;
    }
    const toast = await this.toastCtrl.create({
      message: `AdMob Reward received with currency: ${result.type}, amount ${result.amount}.`,
      duration: 2000,
    });
    await toast.present();

    this.isPrepareReward = false;
  }

  private registerInterstitialListeners(): void {
    const eventKeys = Object.keys(InterstitialAdPluginEvents);

    eventKeys.forEach(key => {
      console.log(`registering ${InterstitialAdPluginEvents[key]}`);
      const handler = AdMob.addListener(InterstitialAdPluginEvents[key], (value) => {
        console.log(`Interstitial Event "${key}"`, value);

        this.ngZone.run(() => {
          this.lastInterstitialEvent$$.next({name: key, value: value});
        })


      });
      this.listenerHandlers.push(handler);
    });
  }

  private registerRewardListeners(): void {
    const eventKeys = Object.keys(RewardAdPluginEvents);

    eventKeys.forEach(key => {
      console.log(`registering ${RewardAdPluginEvents[key]}`);
      const handler = AdMob.addListener(RewardAdPluginEvents[key], (value) => {
        console.log(`Reward Event "${key}"`, value);

        this.ngZone.run(() => {
          this.lastRewardEvent$$.next({name: key, value: value});
        })


      });
      this.listenerHandlers.push(handler);
    });
  }

  private registerBannerListeners(): void {
    const eventKeys = Object.keys(BannerAdPluginEvents);

    eventKeys.forEach(key => {
      console.log(`registering ${BannerAdPluginEvents[key]}`);
      const handler = AdMob.addListener(BannerAdPluginEvents[key], (value) => {
        console.log(`Banner Event "${key}"`, value);

        this.ngZone.run(() => {
          this.lastBannerEvent$$.next({name: key, value: value});
        })

      });
      this.listenerHandlers.push(handler);

    });
  }

  /**
   * ==================== /REWARD END =======================================================================================================
   */

  /**
   * ==================== Interstitial START ================================================================================================
   */
  async prepareInterstitial() {
    this.isLoading = true;

    const options: AdOptions = {
      adId: this.bIds.adMobId.android.intersticial,
      isTesting: this.bIds.adMobId.android.testing
      // npa: true
    };

    try {
      const result = await AdMob.prepareInterstitial(
        options
      );
      console.log('Interstitial Prepared', result);
      this.isPrepareInterstitial = true;
      this.showInterstitial();
      
    } catch (e) {
      console.error('There was a problem preparing the Interstitial', e);
    } finally {
      this.isLoading = false;
    }
  }


  async showInterstitial() {
   await AdMob.showInterstitial()
      .catch(e => console.log(e));

    this.isPrepareInterstitial = false;
  }

  /**
   * ==================== //Interstitial ======================================================================================================
   */   


}
