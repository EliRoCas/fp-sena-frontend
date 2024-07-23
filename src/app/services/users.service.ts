import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost/sigef-final-proyect/Backend/controller/users.php';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}`)
  }

  getById(id: number) {
    return this.http.get(`${this.url}?id=${id}`)
  }

  getByName(name: string) {
    return this.http.get(`${this.url}?filter=${name}`)
  }

  add(data: any) {
    return this.http.post(`${this.url}`, data)
  }

  update(id: number, data: any) {
    return this.http.patch(`${this.url}?id=${id}`, data)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}?id=${id}`)
  }

}
