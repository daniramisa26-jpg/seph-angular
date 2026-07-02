import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/apiResponse';
import { SexResponse } from '../../../shared/models/catalogs/responses/sexResponse';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7160/api/v1/Catalogos';

  getSexes(): Observable<ApiResponse<SexResponse[]>> {
    return this.http.get<ApiResponse<SexResponse[]>>(
      `${this.apiUrl}/sexos`
    );
  }

  getTiposPersonal(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/tipos-personal`
    );
  }

  getTiposContrato(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/tipos-contrato`
    );
  }

  getAreas(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/areas`
    );
  }
}