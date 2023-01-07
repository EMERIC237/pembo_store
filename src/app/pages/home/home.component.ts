import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  colsNum: number = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.colsNum];
  products: Product[] | undefined;
  sort = "desc";
  count = "12";
  productsSubscription: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    // FETCH THE PRODUCTS ON START OF THE APP
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts()
      .subscribe((_products) => {
        this.products = _products["result"];
      });
  }

  onColumnsCountChanged(colsNum: number): void {
    this.colsNum = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.colsNum];
  }
  onItemsCountChanged(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }
  //the sorting is done on the API level
  onSortOrderChanged(newOrder: string): void {
    this.sort = newOrder;
    this.getProducts();
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
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

  // Destroy the subsrciption whe we leave the web site to avoid memory leaks
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
