import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { CarroComponent } from '../carro/carro.component';
import { cartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CatalogoComponent, CarroComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  
  products: Product[] = []

  items: cartItem[] = []

  total: number = 0

  showCart: boolean = false
  
  productS = inject(ProductService)
  
  ngOnInit(): void {
    this.products = this.productS.findAll()
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []
    this.calculatedTotal()
  }

  onAddCart(product: Product){
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
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter( item => item.product.id !== id)
    this.calculatedTotal()
    this.saveSessions()
  }

  calculatedTotal(): void{
    this.total = this.items.reduce( (accumulator, item ) => accumulator + item.quantity * item.product.price, 0)
    
  }

  saveSessions(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  openCart(): void {
    this.showCart = !this.showCart
  }

}
