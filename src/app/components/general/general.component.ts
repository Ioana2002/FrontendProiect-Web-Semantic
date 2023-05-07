import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})

export class GeneralComponent implements OnInit{
  
  movies: {
    name: string;
    year: string;
  }| any = {
    name : ''
  };

  constructor(private service: AppService, private http: HttpClient) {}


  ngOnInit(): void {
    this.service.GetScrappResult().subscribe((response:any) => {
      this.movies = response;

      console.log(this.movies)
    }, (err) => {
      console.log(err);
    })
  }
  
}
