import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.css']
})
export class ComponentNavComponent {

  constructor(public modalService: ModalService){}

  openModal(e: Event){
    e.preventDefault();
    this.modalService.toggleModal('auth');
  }
}
