import { Component, EventEmitter, inject,  } from '@angular/core';
import { cartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {
  
  
  items: cartItem[] = []
  total= 0
  private sharingDataS= inject(SharingDataService)

   constructor(private router:Router){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items']
    this.total = this.router.getCurrentNavigation()?.extras.state!['total']
    
   }
  
                             
  onDeleteCart(id: number) {
    this.sharingDataS.idProductEventEmitter.emit(id)
  }
  

}
