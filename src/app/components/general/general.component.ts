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

  
  dataSource = new MatTableDataSource();
  dataSourceJson = new MatTableDataSource();
  dataSourceTest = new MatTableDataSource();
  dataSourceRdf = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'year'];
  displayedColumnsJson: string[] = ['name', 'year'];
  displayedColumnsRdf: string[] = ['name', 'year'];


  scraped: boolean = false;
  scrapedInserted: boolean = false;
  

  dataTest: any = [];

  dataRdf: {
    subject: any,
    predicate: 'aparutInAnul',
    object: any
  } = {
    subject: '',
    predicate: 'aparutInAnul',
    object: ''
  }

  constructor(private service: AppService, private http: HttpClient, private fb: FormBuilder) { }

  movieModel = this.fb.group({
    name: [''],
    year: [''],
  });


  ngOnInit(): void {

  }

  ShowScrapped() {
    this.service.GetScrappResult().subscribe({
      next: (response: any) => {
        for (var i = 0; i < 3; i++) {
          this.dataSource.data.push(response[i]);
          this.dataSource._updateChangeSubscription();
          this.scraped = true;
        }
      }
    })
  }

  UploadDataJson() {
    this.dataTest = [];
    if (!this.scrapedInserted) {
      this.service.GetScrappResult().subscribe({
        next: (response: any) => {
          for (var i = 0; i < 3; i++) {
            this.dataTest.push(response[i])
          }
          this.scrapedInserted = true;

          var newEntry = {
            name: this.movieModel.get('name')?.value,
            year: this.movieModel.get('year')?.value
          };
          this.dataTest.push(newEntry)
          console.log(this.dataTest)

          this.service.UploadMovie(this.dataTest).subscribe({
            next: (response: any) => {
              this.dataSourceJson.data = [];
              this.service.GetMoviesJson().subscribe({
                next: (response: any) => {
                  console.log(response)
                  response.forEach((movie: any) => {
                    this.dataSourceJson.data.push(movie);
                    this.dataSourceJson._updateChangeSubscription();
                  })
                }
              });
            }
          });
        }
      })
    }
    else {
      var newEntry = {
        name: this.movieModel.get('name')?.value,
        year: this.movieModel.get('year')?.value
      };
      this.dataTest.push(newEntry)
      console.log(this.dataTest)

      this.service.UploadMovie(this.dataTest).subscribe({
        next: (response: any) => {
          this.dataSourceJson.data = [];
          this.service.GetMoviesJson().subscribe({
            next: (response: any) => {
              console.log(response)
              response.forEach((movie: any) => {
                this.dataSourceJson.data.push(movie);
                this.dataSourceJson._updateChangeSubscription();
              })
            }
          });
        }
      });
    }
  }

  InsertRdf(){
    this.service.GetMoviesJson().subscribe({
      next: ((response: any) => {
        console.log(response);
        response.forEach((movie: any) => {
          this.dataRdf.subject = movie.Name;
          this.dataRdf.object = movie.Year;

          this.service.InsertRdfData(this.dataRdf).subscribe({
            next: ((response: any) => {
              this.dataSourceRdf.data = [];
              this.dataSourceRdf.data.push(response);
              this.dataSourceRdf._updateChangeSubscription();
              
            })
          })
        })
      })
    })
    
  }

}
