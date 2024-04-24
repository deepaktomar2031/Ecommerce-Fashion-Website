import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filters } from '../interfaces/filters';
import { IProductResponse } from '../interfaces/product-response';
import { defaultResponse } from '../interfaces/default-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // Returns product list in response, filters are optional
  public async getProducts(
    filters?: Filters | null
  ): Promise<IProductResponse> {
    try {
      let params: { [key: string]: string } = {};

      if (filters) params = this.paramsBuilder(filters);
      const response = await lastValueFrom(this.http.get<IProductResponse>(`${environment.BASE_URL}api/product`, { params }));
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      return defaultResponse;
    }
  }

  // Build query string based on filter used & returns an object 
  private paramsBuilder(options: Filters): { [key: string]: string } {
    const entries = Object.entries(options);
    const filteredEntries = entries.filter(([_, value]) => value !== undefined);
    const finalParams = Object.fromEntries(filteredEntries);
    return finalParams;
  }
}
