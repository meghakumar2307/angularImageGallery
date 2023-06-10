import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterimages'
})
export class FilterimagesPipe implements PipeTransform {

  transform(items: any[], tagName: string): any {    

  	let tagsArr = tagName.split(',');

  	for(let tag of tagsArr) {
	    if(tag === 'all') { return items } else    
	    return items.filter(item =>{    
	      return item.tags.indexOf(tag) != -1;    
	    });  
	}  
  }   

}
