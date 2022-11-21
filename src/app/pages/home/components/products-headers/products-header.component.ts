import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { EnabledBlockingInitialNavigationFeature } from "@angular/router";

@Component({
  selector: "app-products-headers",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columsCountChange = new EventEmitter<number>();
  sort = "desc";
  itemsShowCount: number = 12;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsCountUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumsLayoutUpdated(colsNum: number): void {
    this.columsCountChange.emit(colsNum);
  }
}
