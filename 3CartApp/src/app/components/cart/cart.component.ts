import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { cartItem } from '../../models/cart-item';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [  NavbarComponent, RouterOutlet],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  
 

  items: cartItem[] = []

  total: number = 0


  
  productS = inject(ProductService)
  private router = inject(Router)
  private sharingDataS = inject(SharingDataService)

  constructor(private store: Store<{items: ItemsState}>){
    this.store.select('items').subscribe(state => {
      this.saveSessions()
      this.items = state.items;
    })
  }
  
  ngOnInit(): void {  
    this.store.dispatch(total())
    this.onAddCart()
    this.onDeleteCart()
  }

  onAddCart(){
    this.sharingDataS.productEventEmitter.subscribe(product => {
      
    this.store.dispatch(add( {product: product}))
    this.store.dispatch(total())
      
      this.router.navigate(['cart']);
  
      Swal.fire({
        title: "ShoppingCart",
        text: "Nuevo Producto agregado",
        icon: "success"
      });
    })
  }

  onDeleteCart(): void {
    this.sharingDataS.idProductEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Estas seguro que desea eliminar?",
        text: "Si eliminas, no podras volver a deshacer cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {

    
          this.store.dispatch(remove({id: id}))
          this.store.dispatch(total()) 
          this.router.navigate(['/cart']);
          

          Swal.fire({
            title: "Eliminado!",
            text: "Tu producto ha sido eliminado",
            icon: "success"
          });
        }
      });

    })
  }

 

  saveSessions(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  

}
