import {Component, OnInit} from '@angular/core';
import {ProductService} from "@pages/products/product.service";

interface Product {
  id: number
  title: string
  price: number
  rating: number
}


@Component({
  selector: 'todo-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  ascending = false
  priceAscending = false

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.findAllProducts()
  }

  findAllProducts() {
    this.productService.findAll().subscribe({
      next: (res) => {
        this.products = res['products']
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  sortPrice() {
    this.priceAscending = !this.priceAscending
    this.products = this.priceSort(this.products)
  }

  sortRate() {
    this.ascending = !this.ascending
    this.products = this.rateSort(this.products)
  }

  rateSort(products: Product[]) {
    let done = false;
    while (!done) {
      done = true;
      for (let i = 1; i < products.length; i += 1) {
        if (!this.ascending) {
          if (products[i - 1].rating < products[i].rating) {
            done = false;
            const tmp = products[i - 1];
            products[i - 1] = products[i];
            products[i] = tmp;
          }
        } else {
          if (products[i - 1].rating > products[i].rating) {
            done = false;
            const tmp = products[i - 1];
            products[i - 1] = products[i];
            products[i] = tmp;
          }
        }
      }
    }
    return products;
  }

  priceSort(products: Product[]) {
    let done = false;
    while (!done) {
      done = true;
      for (let i = 1; i < products.length; i += 1) {
        if (!this.priceAscending) {
          if (products[i - 1].price < products[i].price) {
            done = false;
            const tmp = products[i - 1];
            products[i - 1] = products[i];
            products[i] = tmp;
          }
        } else {
          if (products[i - 1].price > products[i].price) {
            done = false;
            const tmp = products[i - 1];
            products[i - 1] = products[i];
            products[i] = tmp;
          }
        }
      }
    }
    return products;
  }

  trackByFn(index: number, p: Product) {
    return p.id
  }
}
