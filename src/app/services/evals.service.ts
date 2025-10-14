import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EvalsService {

  private apiUrl = `${environment.apiUrl}/evals`;
  private apiUrl2 = `${environment.apiUrl}/upload`;
  
  constructor(private http: HttpClient) { }


  createEval(evalData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, evalData);
  }

  //http://localhost:3000/api/evals/process
  processEval(evalID: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/process`, { evalID });
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}`, formData);
  }

  getEvals(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

}
