import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  private apiUrl = environment.apiUrl; //get ApiUrl from environment

  constructor(private http: HttpClient) {}

  // Fetches news from the API based on the provided filters and page number
  getNews(page: number = 1, filter: { category?: string; source?: string; search?: string }) {
    // Initialize HttpParams
    let params = new HttpParams().append('page', page.toString());

    // Append filters to params if they exist
    if (filter.category) {
      params = params.append('category', filter.category);
    }
    if (filter.source) {
      params = params.append('source', filter.source);
    }
    if (filter.search) {
      params = params.append('search', filter.search);
    }

    // Make the HTTP GET request with the constructed URL and parameters
    return this.http.get(this.apiUrl, { params }).pipe(
      map((response: any) => response) // Directly return the response
    );
  }
}

