import { Component, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  constructor() {}

  ngOnInit(): void {}
}
