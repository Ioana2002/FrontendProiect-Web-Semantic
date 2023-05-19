import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';

interface MovieData {
  Name: string;
}

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

  InsertRdfData(data: any){
    return this.http.post(
      this.baseUrl + '/Project/PostRdfServer',
      data
    );
  }

  GetRdfServer() {
    return this.http.get<any>(this.baseUrl + '/Project/GetRdfServer');
  }

  DeleteMovie(name: string) {
    const url = `${this.baseUrl}/Project/DeleteMovie`;
    const data: MovieData = { Name: name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    };
    return this.http.delete(url, httpOptions);
  }
}

