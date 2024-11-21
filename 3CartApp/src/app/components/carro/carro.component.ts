import { Component, EventEmitter, inject, OnInit,  } from '@angular/core';
import { cartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

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

   constructor(private router:Router, private store: Store<{items: ItemsState}>){
    this.store.select('items').subscribe(state => {
      this.items = state.items
      this.total = state.total
    })  
   }


  
  
                             
  onDeleteCart(id: number) {
    this.sharingDataS.idProductEventEmitter.emit(id)
  }
  

}
