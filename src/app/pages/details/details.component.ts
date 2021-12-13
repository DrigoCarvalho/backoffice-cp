import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  url = window.location.href;
  title = 'Conheça a iniciativa ';
  routeSub!: Subscription;
  initiative!: Project;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private service: ProjectService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    const nav = this.router.getCurrentNavigation();
    this.initiative = <Project>nav?.extras.state;
  }

  ngOnInit(): void {}

  aprovar(initiative: Project) {
    this.service.putProject(<string>initiative.id).subscribe(
      (_res) => {
        this.openSucesso();
      },
      (err) => {
        this.openErro();
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  openSucesso() {
    this._snackBar.open('A iniciativa foi aprovada com sucesso!', 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: 'green-snackbar',
    });
  }

  openErro() {
    this._snackBar.open('Erro! Tente novamente.', 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['red-snackbar'],
    });
  }
}
