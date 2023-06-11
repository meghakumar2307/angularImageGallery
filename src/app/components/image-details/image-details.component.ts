import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';  
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router' ;

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnChanges  {

 baseUrl = environment.apiURL;
 fileDetails?: Observable<any>;
    
  constructor(private uploadService: FileUploadService, private route: ActivatedRoute) {
    this.fileDetails = this.uploadService.getFileDetails(this.route.snapshot.params['id']);
  }    
    
  ngOnChanges(){    
    this.fileDetails = this.uploadService.getFileDetails(this.route.snapshot.params['id']);
  }    

}
