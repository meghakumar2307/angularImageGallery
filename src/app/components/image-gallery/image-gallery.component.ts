import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { ImageService } from '../../services/image.service';  
import { FileUploadService } from '../../services/file-upload.service';  

import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnChanges {

 images:any[];    
 filterBy?: string = 'all'    
 allImages:any[] = [];    

 fileInfos?: Observable<any>;
    
  constructor(private imageService: ImageService, private uploadService: FileUploadService) {    
    this.allImages = this.imageService.getImages();  
    this.fileInfos = this.uploadService.getFiles();  
  }    
  ngOnChanges() {    
    this.allImages = this.imageService.getImages();    
  }    
}
