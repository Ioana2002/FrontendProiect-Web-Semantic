import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})

export class GeneralComponent implements OnInit {

  movies: any = []
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'year'];

  constructor(private service: AppService, private http: HttpClient) { }


  ngOnInit(): void { }

  ShowScrapped() {
    this.service.GetScrappResult().subscribe({
      next: (response: any) => {
        console.log(response)
        for (var i = 0; i < 3; i++) {
          this.dataSource.data.push(response[i]);
          this.dataSource._updateChangeSubscription();
        }
      }
    })
  }

}
