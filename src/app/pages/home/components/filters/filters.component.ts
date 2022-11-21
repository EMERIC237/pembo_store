import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  @Output() onCategorySelectedChange = new EventEmitter<string>();
  categories = ["shoes", "sport", "clothes", "accessories"];
  constructor() {}

  ngOnInit(): void {}
  onCategorySelected(category: string): void {
    this.onCategorySelectedChange.emit(category);
  }
}
