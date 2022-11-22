import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  product: Product | undefined = {
    id: 1,
    title: "law of attraction planner",
    price: 29.99,
    category: "book",
    desctiption: "law of attraction planner",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51Zy9ZQZQlL._SX331_BO1,204,203,200_.jpg",
  };
  constructor() {}

  ngOnInit(): void {}

  /**
   * @description
   * This method is used to add a product to the cart
   */
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
