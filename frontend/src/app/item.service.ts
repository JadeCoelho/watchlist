import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Item } from './item';
import { MsgService } from './msg/msg.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl: string = 'http://localhost:8080/items';
  constructor(private http: HttpClient, private msgService: MsgService) {}

  readItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl).pipe(
      map((i: any) => i),
      catchError((e) => this.error(e))
    );
  }

  readItemById(id: any): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`).pipe(
      map((i: any) => i),
      catchError((e) => this.error(e))
    );
  }
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item).pipe(
      map((i: any) => i),
      catchError((e) => this.error(e))
    );
  }
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${item.id}`, item).pipe(
      map((i: any) => i),
      catchError((e) => this.error(e))
    );
  }

  deleteItemById(id: any): Observable<Item> {
    return this.http.delete<Item>(`${this.baseUrl}/${id}`).pipe(
      map((i: any) => i),
      catchError((e) => this.error(e))
    );
  }

  error(e: any): Observable<any> {
    this.msgService.setMsg(e.message, 'var(--error)');
    return EMPTY;
  }
}
