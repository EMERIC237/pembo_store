import { Component, OnInit } from "@angular/core";

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
  constructor() {}

  ngOnInit(): void {}
  onColumnsCountChanged(colsNum: number): void {
    this.colsNum = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.colsNum];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
