import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  upload(file: File, formValues): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('title', formValues.title);
    formData.append('tags', formValues.tags);
    formData.append('description', formValues.description);
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${page}/${limit}`);
  }

  getFileDetails(fileId): Observable<any> {
    return this.http.get(`${this.baseUrl}/detail/${fileId}`);
  }

  getFilesByTagName(tagName, page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${tagName}/${page}/${limit}`);
  }

  getFilesBySearch(searchText, page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${searchText}/${page}/${limit}`);
  }

  getTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags`);
  }

  getFilesCount(type="all", value="all"): Observable<any> {
    return this.http.get(`${this.baseUrl}/count/${type}/${value}`);
  }
}