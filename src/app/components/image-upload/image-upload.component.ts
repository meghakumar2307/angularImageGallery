import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { Router } from '@angular/router' ;

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
	
	selectedFiles?: FileList;
	currentFile?: File;
	message = '';

	formData = {
    	title: '',
    	tags: '',
    	fileSource: '',
    	description: ''
  	};

  constructor(private uploadService: FileUploadService, private router: Router) { }

  ngOnInit() {
  	 
  }

  onSelect(tag) : void {
    console.log('tag selected: value is ' + tag);
    console.log(this.formData.tags);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, this.formData).subscribe(
          (event: any) => {
              this.message = event.body.message;
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }
      this.router.navigate(['/gallery']);
      this.selectedFiles = undefined;
    }
  }
}
