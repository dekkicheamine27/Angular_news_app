import { Component, OnInit } from '@angular/core';
import { NewsService } from '../service/news-services.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  newsItems: any[] = [];
  selectedCategory: string = '';
  selectedSource: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 50;
  hasNextPage = true;
  currentSearchTerm: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.fetchNews(1, {}); // Initial news fetch on component load
  }

  // Fetches news from the API based on filters and pagination
  fetchNews(page: number, filter: { category?: string; source?: string; search?: string }) {
    this.newsService.getNews(page, filter).subscribe(data => {
      this.newsItems = data.results.reverse(); // Reverses fetched news items for display
      this.currentPage = page; // Updates the current page number
      this.totalPages = Math.ceil(data.count / this.itemsPerPage); // Calculates total pages
      this.hasNextPage = !!data.next; // Checks if there is a next page
    });
  }

  // Handles category filter changes
  onCategoryChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    this.selectedCategory = element.value;
    this.fetchNews(1, { source: this.selectedSource, category: this.selectedCategory });
  }

  // Handles source filter changes
  onSourceChange(event: Event): void {
    const element = event.target as HTMLSelectElement;
    this.selectedSource = element.value;
    this.fetchNews(1, { source: this.selectedSource, category: this.selectedCategory });
  }

  // Pagination control
  goToPage(page: number) {
    this.fetchNews(page, {});
  }

  // Initiates search with current term
  onSearch() {
    this.fetchNews(1, { search: this.currentSearchTerm });
  }

  // Updates the search term from input
  onSearchTermChange(newSearchTerm: string) {
    this.currentSearchTerm = newSearchTerm;
  }

  // Resets the search and fetches news without filters
  resetSearch() {
    this.currentSearchTerm = '';
    this.fetchNews(1, {});
  }
}
