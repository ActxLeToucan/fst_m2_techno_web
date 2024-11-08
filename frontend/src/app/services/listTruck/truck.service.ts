import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTruckDto } from './dto/create-truck.dto.js';
import { TruckEntity } from './entities/truck.entity.js'; 
import { UpdateTruckDto } from './dto/update-truck.dto.js';
import { environment } from '../../../environments/environment.js';
@Injectable({
  providedIn: 'root',
})
export class ListTrucksService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<TruckEntity[]> {
    return this.http.get<TruckEntity[]>(this.baseUrl);
  }

  findOne(plate: string): Observable<TruckEntity> {
    return this.http.get<TruckEntity>(`${this.baseUrl}/${plate}`);
  }

  create(truckData: CreateTruckDto): Observable<TruckEntity> {
    return this.http.post<TruckEntity>(this.baseUrl, truckData);
  }

  update(plate: string, truckData: CreateTruckDto): Observable<TruckEntity> {
    return this.http.put<TruckEntity>(`${this.baseUrl}/${plate}`, truckData);
  }

  updateById(id: string, updateTruckDto: UpdateTruckDto): Observable<TruckEntity> {
    return this.http.put<TruckEntity>(`${this.baseUrl}/${id}`, updateTruckDto);
}

  delete(plate: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${plate}`);
  }
}
