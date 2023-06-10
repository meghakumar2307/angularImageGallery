import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor() { }

  allImages:any = [];    
    
    getImages() {    
        return this.allImages = Imagesdetails.slice(0);    
    }    
    
    getImage(id: number) {    
        return Imagesdetails.slice(0).find(Images => Images.id == id)    
    }    
}    
const Imagesdetails = [    
    { "id": 1, "title": "Image title", "description": "Describe the image above", "tags": "tag1", "url": "assets/images/image1.jpg" },    
    { "id": 2, "title": "Image title", "description": "Describe the image above", "tags": "tag1, tag2", "url": "assets/images/image2.jpg" },    
    { "id": 3, "title": "Image title", "description": "Describe the image above", "tags": "tag1", "url": "assets/images/image3.jpg" },    
    { "id": 4, "title": "Image title", "description": "Describe the image above", "tags": "tag1", "url": "assets/images/image4.jpg" },    
    { "id": 5, "title": "Image title", "description": "Describe the image above", "tags": "tag2", "url": "assets/images/image5.jpg" },    
    { "id": 6, "title": "Image title", "description": "Describe the image above", "tags": "tag2, tag3", "url": "assets/images/image6.jpg" },    
    { "id": 7, "title": "Image title", "description": "Describe the image above", "tags": "tag2", "url": "assets/images/image7.jpg" },    
    { "id": 8, "title": "Image title", "description": "Describe the image above", "tags": "tag2", "url": "assets/images/image8.jpg" },    
    { "id": 9, "title": "Image title", "description": "Describe the image above", "tags": "tag3", "url": "assets/images/image9.jpg" },    
    { "id": 10, "title": "Image title", "description": "Describe the image above", "tags": "tag3", "url": "assets/images/image10.jpg" },    
    { "id": 11, "title": "Image title", "description": "Describe the image above", "tags": "tag3", "url": "assets/images/image11.jpg" },    
    { "id": 12, "title": "Image title", "description": "Describe the image above",  "tags": "tag3", "url": "assets/images/image12.jpg" }    
]    
