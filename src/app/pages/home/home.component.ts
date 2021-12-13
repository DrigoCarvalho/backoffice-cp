import { ProjectService } from 'src/app/services/project.service';
import { Project } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listaIniciativas$!: Observable<Project[]>;

  constructor(private router: Router, private service: ProjectService) {}

  ngOnInit(): void {
    this.listaIniciativas$ = this.service.getProjects();
  }

  redirect(data: Project) {
    this.router.navigateByUrl('/details', {
      state: data,
    });
  }
}
