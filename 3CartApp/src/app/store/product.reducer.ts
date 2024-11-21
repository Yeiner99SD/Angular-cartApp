import { createReducer, on } from "@ngrx/store"
import { load } from "./product.action"


const products: any[] = []

const initialState= {
    products: products
}

export const productsReducer = createReducer(
    initialState,
    on(load, (state, { products }) => ({ products: [...products]})) 


)