import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { cartItem } from '../../models/cart-item';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

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
  
  ngOnInit(): void {
   
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]')
    this.calculatedTotal()
    this.onDeleteCart()
    this.onAddCart()
  }

  onAddCart(){
    this.sharingDataS.productEventEmitter.subscribe(product => {
      const hasItems = this.items.find(item => {
        return item.product.id === product.id
      })
      if(hasItems) {
        this.items = this.items.map(item => {
          if(item.product.id === product.id){
            return {
              ... item,
              quantity: item.quantity +1
            }
          }
          return item
        })
  
      }else{
        this.items = [... this.items, {product: {... product}, quantity: 1}]
      }
      this.calculatedTotal()
      this.saveSessions()
      this.router.navigate(['cart'], {
        state: {items: this.items, total: this.total}
      })
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

          this.items = this.items.filter( item => item.product.id !== id)
          if(this.items.length == 0){
            sessionStorage.removeItem('cart')
          }
          this.calculatedTotal()
          this.saveSessions()
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'], {state: {items: this.items, total: this.total}
            })
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Tu producto ha sido eliminado",
            icon: "success"
          });
        }
      });

    })
  }

  calculatedTotal(): void{
   this.total = this.items.reduce( (accumulator, item ) => accumulator + item.quantity * item.product.price, 0)
    
  }

  saveSessions(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  

}
