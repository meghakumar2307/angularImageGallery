import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

const routes: Routes = [
	{
	    path: '',
	    redirectTo: 'gallery',
	    pathMatch: 'full',
	},
	{
    	path: 'gallery',
    	component: ImageGalleryComponent
  },
	{
    	path: 'image/:id',
    	component: ImageDetailsComponent
  },
  {
      path: 'upload',
      component: ImageUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
