import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
}

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

// Se define la estructura del modelo de usuario que se aplicará, concuerda con la DB
export interface UserModel {
  id_user: number;
  user_name: string;
  user_lastname: string;
  fo_document_type: number;
  document_number: number;
  email: string;
  password: string;
}

export interface DocTypeModel {
  id_document_type: number;
  document_type_name: string;
}

export interface RoleModel {
  id_user_role: number;
  role_name: string;
}

export interface RoleAssignModel {
  fo_user: number;
  fo_user_role: number;
}

// Se crea una instancia de "EntityAdapter" específica para el modelo de usuario hecho (UserModel),
// designándole el nombre "users". Este adaptador proporciona métodos HTTP para realizar operaciones CRUD
// en el estado, utilizando por debajo la lógica de NGRX
export const userAdapter = new EntityAdapter<UserModel>('users', {
  getId: (input) => input.id_user.toString(),
  additionalData: { id: 'id_user' },
});

export const roleAdapter = new EntityAdapter<RoleModel>('user_roles', {
  getId: (input) => input.id_user_role.toString(),
  additionalData: { id: 'id_user_role' },
});

export const docTypeAdapter = new EntityAdapter<DocTypeModel>(
  'document_types',
  {
    getId: (input) => input.id_document_type.toString(),
    additionalData: { id: 'id_document_type' },
  }
);

export const roleAssignAdapter = new EntityAdapter<RoleAssignModel>(
  'user_roles_assignment',
  {
    getId: (input) => input.fo_user.toString(),
    additionalData: { id: 'fo_user' },
  }
);

// Se crea una función (userByName) que retrorna un selector, que filtra los datos de "users",
// que llegan por "userAdapter.feature" para encontrar los usuarios (user_name) que cotengan la cadena "name",
// se ignoran las mayúsculas y minúsculas.
export const userByName = (name: string) =>
  createSelector(userAdapter.feature, (users) => {
    return users.filter(
      (u) => u.user_name.toLowerCase().indexOf(name.toLowerCase()) > -1
    );
  });

export const userByEmail = (email: string) =>
  createSelector(userAdapter.feature, (users) => {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  });

export const userById = (id: number) =>
  createSelector(userAdapter.feature, (users) => {
    return users.find((u) => u.id_user === id);
  });

export type UserDocType = UserModel & {
  doc_Name: string;
  roleIds: number[];
  roleNames: string;
};

// export const userDocuments = createSelector(
//   userAdapter.feature,
//   docTypeAdapter.feature,
//   (users, documents) => {
//     return users.map((user) => {
//       const document = documents.find(
//         (doc) => doc.id_document_type === user.fo_document_type
//       );
//       return {
//         ...user,
//         doc_Name: document?.document_type_name,
//       } as UserDocType;
//     });
//   }
// );

export const userRoleAssign = createSelector(
  userAdapter.feature,
  roleAdapter.feature,
  roleAssignAdapter.feature,
  docTypeAdapter.feature,
  (users, user_roles, user_roles_assignment, documents) => {
    return users.map((u) => {
      const user_role_assign = user_roles_assignment.filter(
        (ra) => ra.fo_user === u.id_user
      );

      const roleIds = user_role_assign.map((x) => x.fo_user_role);
      const roleNames = user_role_assign.map(
        (x) =>
          user_roles.find((r) => r.id_user_role === x.fo_user_role)?.role_name
      );

      const document = documents.find(
        (doc) => doc.id_document_type === u.fo_document_type
      );

      return {
        ...u,
        roleIds: roleIds.length > 0 ? roleIds : [],
        roleNames:
          roleNames.length > 0 ? roleNames.join(', ') : 'Rol no asignado',
          doc_Name: document?.document_type_name,
      } as UserDocType;
    });
  }
);

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
