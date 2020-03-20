import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private PHONE_PATTERN: RegExp = new RegExp('^(77|78|70|76|33)[0-9]{7}');
  private PHONE_PATTERN_BIS: RegExp = new RegExp('^(77|78|70|76|33)\\s[0-9]{3}\\s[0-9]{2}\\s[0-9]{2}');

  constructor(private toastCtrl: ToastController,
              private sanitizer: DomSanitizer) { }

  async presentToast(message: string,  color: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      color,
      duration: 2000
    });
    await toast.present();
  }

  validatePhone(telephone: string): boolean {
    telephone = telephone.trim();
    if (this.PHONE_PATTERN.test(telephone) || this.PHONE_PATTERN_BIS.test(telephone)) {
      return true;
    }
    return false;
  }

  getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getFormattedDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().length === 1 ? '0' + currentDate.getDate().toString() : currentDate.getDate().toString();
    // tslint:disable-next-line: max-line-length
    const curMonth = currentDate.getMonth() + 1;
    const month = curMonth.toString().length === 1 ? '0' + curMonth.toString() : curMonth.toString();
    return currentDate.getFullYear() + '-' + month + '-' + day;
  }
}
