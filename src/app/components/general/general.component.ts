import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})

export class GeneralComponent implements OnInit {

  movies: any = []
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'year'];

  scraped: boolean = false;

  formRDF: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.formRDF = this.fb.group({
      name: [''],
      year: [''],
    });
   }

  ShowScrapped() {
    this.service.GetScrappResult().subscribe({
      next: (response: any) => {
        console.log(response)
        for (var i = 0; i < 3; i++) {
          this.dataSource.data.push(response[i]);
          this.dataSource._updateChangeSubscription();
          this.scraped = true;
        }
      }
    })
  }

}
