import { Component, OnInit, Input, OnChanges,TemplateRef   } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';  

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnChanges {
   
 baseUrl = environment.apiURL;
 fileInfos?: Observable<any>;
 tagsList?: Observable<any>;
 selectedTag = 'all';
  
  modalRef: BsModalRef; 
  imageDetails:any;

  searchInput:any;


  constructor(private uploadService: FileUploadService, private modalService: BsModalService) { 
    this.fileInfos = this.uploadService.getFiles();  
    this.tagsList = this.uploadService.getTags();  
  }    

  ngOnChanges() {    
    this.fileInfos = this.uploadService.getFiles(); 
    this.tagsList = this.uploadService.getTags();  
  }    

  async openModal(template: TemplateRef<any>, imageId) {
    await this.uploadService.getFileDetails(imageId).subscribe(res => this.imageDetails = res[0]);
    
    this.modalRef = this.modalService.show(template);
  }

  filterByTagName(event){
    let tagName = event.target.value;
  	if(tagName == "all")
  		this.fileInfos = this.uploadService.getFiles(); 	
  	else  {
      let assignedTags = tagName.split(',');
  		
      for(let tag of assignedTags) {
        this.fileInfos = this.uploadService.getFilesByTagName(tagName); 
      }
    }
  }

  filterByImageTag(tagName) {
    this.selectedTag = tagName;
    if(tagName == "all")
      this.fileInfos = this.uploadService.getFiles();   
    else
      this.fileInfos = this.uploadService.getFilesByTagName(tagName); 
  }

  searchByAttributes() {
    this.fileInfos = this.uploadService.getFilesBySearch(this.searchInput); 
  }
}
