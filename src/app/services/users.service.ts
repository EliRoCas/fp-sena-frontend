import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserModel {
  fo_document_type: number,
  document_type_name: string;
  document_number: number;
  user_name: string;
  user_lastname: string;
  roles: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost/sigef-final-proyect/Backend/controller/users.php';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserModel[]>(`${this.url}`)
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
