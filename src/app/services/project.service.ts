import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api.url}/aprovado/nao`);
  }

  putProject(id: string): Observable<Project[]> {
    const body = JSON.stringify({
      aprovado: 'sim',
    });
    return this.http.patch<any[]>(`${environment.api.url}/id/${id}`, body);
  }
}
