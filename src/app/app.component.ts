import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'tar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TargetSistemas';

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'action' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private api:ApiService){}

  ngOnInit(): void {
    this.getAllPersons();
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    });
  }


  getAllPersons(){
    this.api.getPerson()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;  
        },
        error:(err)=>{
          console.log('Erro ao buscar todas as pessoas!');
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePerson(id: number){
    this.api.deletePerson(id)
      .subscribe({
        next: (res) => {
          this.getAllPersons();
        },
        error:(err)=>{
          console.log('Erro ao deletar pessoa!');
        }
      })
  }
}
