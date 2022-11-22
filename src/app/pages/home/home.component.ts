import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  2: 335,
  4: 350,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  colsNum: number = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.colsNum];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  onColumnsCountChanged(colsNum: number): void {
    this.colsNum = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.colsNum];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
  onAddedToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
