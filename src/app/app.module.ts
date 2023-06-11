import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  

import { NgxPaginationModule } from 'ngx-pagination';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadService } from './services/file-upload.service';   

import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { SplitPipePipe } from './pipes/split-pipe.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';

TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Add new tag'
    }
});

@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    ImageDetailsComponent,
    ImageUploadComponent,
    SplitPipePipe
  ],
  imports: [
    BrowserModule,
    TagInputModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
