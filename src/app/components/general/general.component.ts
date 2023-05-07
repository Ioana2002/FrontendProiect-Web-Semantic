import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})


export class GeneralComponent implements OnInit{
  
  dataSourceMovies = new MatTableDataSource();
  displayedColumnsMovies: string[] = ['name', 'year'];

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private service: AppService, private http: HttpClient) {}


  ngOnInit(): void {
    this.service.GetScrappResult().subscribe((response: any) => {
      this.dataSourceMovies.paginator = this.paginator.toArray()[0];
      response.forEach((event: any) => {
        this.dataSourceMovies.data.push(event);
        this.dataSourceMovies._updateChangeSubscription();
      })
    }, (err) => {
      console.log(err);
    })
  }
  
}
