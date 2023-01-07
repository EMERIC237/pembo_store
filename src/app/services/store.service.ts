import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
interface productsResult {
  ms: number;
  query: string;
  result: Product[];
}
interface categoriesResult {
  ms: number;
  query: string;
  result: string[];
}

// const STORE_BASE_URL =`https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}
  PROJECT_ID = "jgvlyd4q";
  DATASET = "production";

  getAllProducts(): Observable<productsResult> {
    let QUERY =
      "*[_type == 'product'] {'id':_id,'title':name, category , description, price, 'image':image.asset->url }";
    return this.httpClient.get<productsResult>(
      `https://${this.PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${this.DATASET}?query=${QUERY}`
    );
  }

  getAllCategories(): Observable<categoriesResult> {
    let QUERY = "*[_type == 'product'].category";
    return this.httpClient.get<categoriesResult>(
      `https://${this.PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${this.DATASET}?query=${QUERY}`
    );
  }
}

// export class StoreService {
//   constructor(private httpClient: HttpClient) {}

//   getAllProducts(
//     limit = "12",
//     sort = "desc",
//     category?: string
//   ): Observable<Array<Product>> {
//     return this.httpClient.get<Array<Product>>(
//       `${STORE_BASE_URL}/products${
//         category ? "/category/" + category : ""
//       }?sort=${sort}$limit=${limit}`
//     );
//   }

//   getAllCategories(): Observable<string[]> {
//     return this.httpClient.get<string[]>(
//       `${STORE_BASE_URL}/products/categories`
//     );
//   }
// }
