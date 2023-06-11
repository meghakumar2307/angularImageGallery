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


  /* pagination */
  page: number = 1;
  limit: number = 10;
  total: number;


  constructor(private uploadService: FileUploadService, private modalService: BsModalService) {
   this.uploadService.getFilesCount('all', 'all').subscribe(res => {
    console.log(res);
    this.total = res.data
   });  
    this.fileInfos = this.uploadService.getFiles(this.page, this.limit);  
    this.tagsList = this.uploadService.getTags();  
  }    

  ngOnChanges() {    
   this.uploadService.getFilesCount('all', 'all').subscribe(res => this.total = res.data);  
    this.fileInfos = this.uploadService.getFiles(this.page, this.limit); 
    this.tagsList = this.uploadService.getTags();  
  }    

  getPage(pageNo: number) {
    this.page = pageNo;

    if(this.selectedTag != "all") {
      this.uploadService.getFilesCount('tags', this.selectedTag).subscribe(res => this.total = res.data);  
      this.fileInfos = this.uploadService.getFilesByTagName(this.selectedTag, this.page, this.limit); 
    } else if(this.searchInput) {
      this.uploadService.getFilesCount('search', this.searchInput).subscribe(res => this.total = res.data);  
      this.fileInfos = this.uploadService.getFilesBySearch(this.searchInput, this.page, this.limit); 
    } else {
      alert("DSs");
      this.uploadService.getFilesCount('all', 'all').subscribe(res => this.total = res.data); 
      this.uploadService.getFiles(this.page, this.limit);
    }

  }

  async openModal(template: TemplateRef<any>, imageId) {
    await this.uploadService.getFileDetails(imageId).subscribe(res => this.imageDetails = res[0]);
    
    this.modalRef = this.modalService.show(template);
  }

  filterByTagName(event){
    let tagName = event.target.value;
  	if(tagName == "all"){
      this.uploadService.getFilesCount('all', 'all').subscribe(res => this.total = res.data);  
  		this.fileInfos = this.uploadService.getFiles(this.page, this.limit); 	
    }
  	else  {  
      this.uploadService.getFilesCount('tags', tagName).subscribe(res => this.total = res.data);  
      this.fileInfos = this.uploadService.getFilesByTagName(tagName, this.page, this.limit); 
    }
  }

  filterByImageTag(tagName) {
    this.selectedTag = tagName;
    if(tagName == "all"){
      this.uploadService.getFilesCount('all', 'all').subscribe(res => this.total = res.data);  
      this.fileInfos = this.uploadService.getFiles(this.page, this.limit);   
    }
    else{
      this.uploadService.getFilesCount('tags', tagName).subscribe(res => this.total = res.data);  
      this.fileInfos = this.uploadService.getFilesByTagName(tagName, this.page, this.limit); 
    }
  }

  searchByAttributes() {
    this.uploadService.getFilesCount('search', this.searchInput).subscribe(res => this.total = res.data);  
    this.fileInfos = this.uploadService.getFilesBySearch(this.searchInput, this.page, this.limit); 
  }
}
