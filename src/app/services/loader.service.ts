import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor( public loadingController: LoadingController ) {}

  showLoader = async() => {
    var load = await this.loadingController.create({
      message: 'Cargando...'
    });
    await load.present();
  }

  hideLoader = async() => {
    await this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
}
