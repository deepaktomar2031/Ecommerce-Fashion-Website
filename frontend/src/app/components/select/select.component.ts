import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { Filters } from '../../interfaces/filters';
import { sortOption, filters } from './../../../utils/enums';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent implements OnInit {
  // Dropdown Filter Option
  brandNameArray: string[] = [];
  categoryArray: string[] = [];
  priceSortArray: string[] = [sortOption.asc, sortOption.desc];

  // Filter Controls
  filtersForm = new FormGroup({
    selectedCategory: new FormControl(''),
    selectedBrand: new FormControl(''),
    sortByPrice: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  // fetches brand names & categories on init from ProductService
  async ngOnInit(): Promise<void> {
    try {
      this.brandNameArray = (await this.productService.getProducts()).data
        .filters[filters.property_1] as any;
      this.categoryArray = (await this.productService.getProducts()).data
        .filters[filters.property_2] as any;
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  // Provide the filter values to FilterService on form submit
  onFormSubmit() {
    const filterValues = this.filtersForm.value;
    const transformedFilter: Filters = {
      category: filterValues.selectedCategory,
      brandName: filterValues.selectedBrand,
      price: filterValues.sortByPrice,
    };
    if (transformedFilter.price == sortOption.asc) {
      transformedFilter.price = 'asc';
    } else if (transformedFilter.price == sortOption.desc) {
      transformedFilter.price = 'desc';
    }
    this.filterService.setFilters(transformedFilter);
  }
}
