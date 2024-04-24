import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { IProductData } from '../../interfaces/product';
import { IProductResponse } from '../../interfaces/product-response';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
})
export class ProductsComponent implements OnInit {
  public productData: IProductData[];
  public resultCount: Number;

  /**
   * @param productService - Service to fetch products array
   * @param filterService - Service to obtain the current filters
   */
  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {
    this.productData = [];
    this.resultCount = 0;
  }

  async ngOnInit(): Promise<void> {
    this.filterService.filters$.subscribe((options) => {
      this.productService
        .getProducts(options)
        .then((response: IProductResponse) => {
          this.productData = response.data.productData;
          this.resultCount = response.resultCount;
        });
    });
  }
}
