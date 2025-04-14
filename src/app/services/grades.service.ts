import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Ensure the correct path to the environment file
import { environment } from '../../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class GradesService {

  private apiUrl = `${environment.apiUrl}/grades`;
  constructor(private http: HttpClient) { }

  getGrades(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

}
