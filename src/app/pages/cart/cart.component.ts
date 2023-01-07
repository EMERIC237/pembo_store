import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
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
  constructor(private cartService: CartService, private http: HttpClient) {}

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

  onCheckout(): void {
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51M79XSLV1EnPNenc3NEEFMhYC3XW0Al9PMGPsXG4EskYS94anjZ3PyMZz6F9uTvSbllBnQhOFJT6yZ7WSvVkGJNu00wEXaFCjj"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
