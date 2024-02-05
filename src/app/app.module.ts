import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NewsService} from "./service/news-services.service";
import { NewsListComponent } from './news-list/news-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule.withFetch(),
    FormsModule

  ],
  providers: [
    provideClientHydration(),
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
