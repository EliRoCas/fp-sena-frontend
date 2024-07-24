
import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

// Se define la estructura del modelo de usuario que se aplicará, concuerda con la DB 
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

// Se crea una instancia de "EntityAdapter" específica para el modelo de usuario hecho (UserModel), 
// designándole el nombre "users". Este adaptador proporciona métodos HTTP para realizar operaciones CRUD
// en el estado, utilizando por debajo la lógica de NGRX 
export const userAdapter = new EntityAdapter<UserModel>("users");

// Se crea una función (userByName) que retrorna un selector, que filtra los datos de "users", 
// que llegan por "userAdapter.feature" para encontrar los usuarios (user_name) que cotengan la cadena "name",
// se ignoran las mayúsculas y minúsculas. 
export const userByName = (name: string) => createSelector(userAdapter.feature, users => {
  return users.filter(u => u.user_name.toLowerCase().indexOf(name.toLowerCase()) > -1);
})




// -----------------------------------------------------------------------------------
// CÓDIGO SUGERIDO POR EL DOCENTE 
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   url = 'http://localhost/sigef-final-proyect/Backend/controller/users.php';

//   constructor(private http: HttpClient) { }

//   getAll() {
//     return this.http.get<UserModel[]>(`${this.url}`)
//   }

//   getById(id: number) {
//     return this.http.get(`${this.url}?id=${id}`)
//   }

//   getByName(name: string) {
//     return this.http.get(`${this.url}?filter=${name}`)
//   }

//   add(data: any) {
//     return this.http.post(`${this.url}`, data)
//   }

//   update(id: number, data: any) {
//     return this.http.patch(`${this.url}?id=${id}`, data)
//   }

//   delete(id: number) {
//     return this.http.delete(`${this.url}?id=${id}`)
//   }

// }
