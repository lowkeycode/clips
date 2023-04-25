import { Injectable } from '@angular/core';

interface Modal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Modal[] = [];

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find((modal) => modal.id ===id)?.visible
  }

  toggleModal(id: string) {
    const modal = this.modals.find((modal) => modal.id ===id)

    if(modal){
      modal.visible = !modal.visible;
    }
  }
}
