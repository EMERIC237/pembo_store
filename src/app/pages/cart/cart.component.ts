import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Angenda",
        price: 190,
        quantity: 2,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Angenda",
        price: 190,
        quantity: 5,
        id: 2,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Angenda",
        price: 190,
        quantity: 5,
        id: 3,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.calculateTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveItemFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddItemQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveItemQuantity(item: CartItem): void {
    item.quantity > 1
      ? this.cartService.reduceQuantity(item)
      : this.cartService.removeFromCart(item);
  }
}
