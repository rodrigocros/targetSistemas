import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tar-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  personList !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api:ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.personList = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required], 
    });
  }

  addPerson(){
    if(this.personList.valid){
      this.api.postPerson(this.personList.value)
      .subscribe({
        next: (res) => {
          alert('Pessoa cadastrada com sucesso!');
          this.personList.reset();
          this.dialogRef.close('Salvo');
        },
        error:()=>{
          alert('Erro ao cadastrar pessoa!');
        }
      })
    }
  }
}
