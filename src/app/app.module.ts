import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  

import { NgxPaginationModule } from 'ngx-pagination';

import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageService } from './services/image.service';   
import { FileUploadService } from './services/file-upload.service';   

import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { FilterimagesPipe } from './pipes/filterimages.pipe';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    ImageDetailsComponent,
    FilterimagesPipe,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    TagInputModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ImageService, FilterimagesPipe, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
