import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    // get a copy of the cart items
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id);
    if (itemsInCart) {
      itemsInCart.quantity++;
    } else {
      items.push(item);
    }

    // emit the new value(s) so that all the subscribers can get the new value(s)
    this.cart.next({ items });
    // Display a message to the user
    this._snackar.open("Added to cart", "OK", { duration: 3000 });
    console.log(this.cart.value);
  }

  calculateTotal(items: Array<CartItem>): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart.next({ items: [] });
    this._snackar.open("Cart is cleared", "OK", {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    // subscrive a new array of items filtered with the deleted items
    this.cart.next({ items: filteredItems });
    // display a message to the user
    this._snackar.open("1 item has been removed from cart", "OK", {
      duration: 3000,
    });
  }
  /**
   *
   * @param item
   * @description
   * reduce the quantity if it's more than two otherwise it's delete using 'removeFromCart'
   */
  reduceQuantity(item: CartItem): void {
    const updateItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
      }
      return _item;
    });

    this.cart.next({ items: updateItems });
  }
}
