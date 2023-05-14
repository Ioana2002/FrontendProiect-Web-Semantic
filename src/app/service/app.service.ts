import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  

  readonly baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  GetScrappResult() {
    return this.http.get<any>(this.baseUrl + '/Project/GetScrappResult');
  }

  UploadMovie(formData: any) {
    return this.http.post(
      this.baseUrl + '/Project/UploadMovie',
      formData
    );
  }

  GetMoviesJson() {
    return this.http.get<any>(this.baseUrl + '/Project/GetMovieJson');
  }
}

