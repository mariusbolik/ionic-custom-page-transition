import { Component } from '@angular/core';
import { NavController, ModalController, mdTransitionAnimation } from '@ionic/angular';
import { MyModalComponent } from '../../components/my-modal/my-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navController: NavController, private modalController: ModalController) {}

  async openPage() {
    await this.navController.navigateForward('/about', {
      animation: mdTransitionAnimation
    });
  }

  async openModal() {
    const modalOptions = await this.modalController.create({
      id: 'custom-modal', // global.scss
      component: MyModalComponent,
      swipeToClose: true,
    });
    await modalOptions.present();
  }

}
