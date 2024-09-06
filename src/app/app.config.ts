import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
} from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { provideRepositoryWebApi } from '@ea-controls/ngrx-repository-webapi';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  docTypeAdapter,
  roleAdapter,
  roleAssignAdapter,
  userAdapter,
} from './services/users.service';
import { productAdapter } from './services/products.service';
import { catAdapter } from './services/categories.service';
import { subcatAdapter } from './services/subcategories.service';
import {
  roseTypeAdapter,
  transactionAdapter,
} from './services/transactions.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { UserGuard } from './guards/user-guard.guard';
import { environment } from '../../environment';
import { EntityAdapter } from '@ea-controls/ngrx-repository';
import { provideRepositoryPouchDb } from '@ea-controls/ngrx-repository-pouchdb';
import PouchDB from 'pouchdb';

const adapters: EntityAdapter<any>[] = [
  userAdapter,
  roleAdapter,
  docTypeAdapter,
  productAdapter,
  catAdapter,
  subcatAdapter,
  transactionAdapter,
  roseTypeAdapter,
  roleAssignAdapter,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    ...adapters.map((a) => provideState(a.reducer())),
    importProvidersFrom(RouterModule),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClient),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CookieService,
    AuthService,
    UserGuard,

    !environment.isMobile
      ? provideRepositoryWebApi({
          adapters: adapters,
          urlBase: environment.urlBase,
          getUrl(adapter) {
            return `${environment.urlBase}/${adapter.name}.php`;
          },
          removeUrl(adapter, data) {
            return `${environment.urlBase}/${
              adapter.name
            }.php?id=${adapter.getId(data)}`;
          },
          postUrl(adapter, data) {
            return `${environment.urlBase}/${adapter.name}.php`;
          },
          patchUrl(adapter, data) {
            return `${environment.urlBase}/${
              adapter.name
            }.php?id=${adapter.getId(data)}`;
          },
        })
      : provideRepositoryPouchDb({
          adapters: adapters,
          getIdField: (adapter) => adapter.options.additionalData?.id,
          getDb(adapter) {
            var db = new PouchDB(adapter.name);

            if (adapter.name == catAdapter.name) {
              db.allDocs({ include_docs: true }).then((result) => {
                if (result.rows.length === 0) {
                  db.bulkDocs([
                    { _id: '1', category_name: 'Agroinsumos' },
                    { _id: '2', category_name: 'Salarios' },
                    { _id: '3', category_name: 'Publicidad' },
                    { _id: '4', category_name: 'Alquiler' },
                  ]);
                }
              });
            }

            if (adapter.name == docTypeAdapter.name) {
              db.allDocs({ include_docs: true }).then((result) => {
                if (result.rows.length === 0) {
                  db.bulkDocs([
                    { _id: '1', document_type_name: 'Cédula de Ciudadanía' },
                    { _id: '2', document_type_name: 'Cédula de Extranjería' },
                    {
                      _id: '3',
                      document_type_name: 'Permiso Especial de Permanecia',
                    },
                    {
                      _id: '4',
                      document_type_name: 'Permiso de Protección Temporal',
                    },
                    { _id: '5', document_type_name: 'Tarjeta de Identidad' },
                    { _id: '6', document_type_name: 'Visa de Trabajo' },
                    { _id: '7', document_type_name: 'Pasaporte' },
                  ]);
                }
              });
            }

            if (adapter.name == roleAdapter.name) {
              db.allDocs({ include_docs: true }).then((result) => {
                if (result.rows.length === 0) {
                  db.bulkDocs([
                    { _id: '1', role_name: 'Administrador' },
                    { _id: '2', role_name: 'Capataz' },
                    { _id: '3', role_name: 'Jefe de Plantación' },
                    { _id: '4', role_name: 'Jefe de Finanzas' },
                    { _id: '5', role_name: 'Operario' },
                  ]);
                }
              });
            }

            if (adapter.name == roseTypeAdapter.name) {
              db.allDocs({ include_docs: true }).then((result) => {
                if (result.rows.length === 0) {
                  db.bulkDocs([
                    { _id: '1', rose_type_name: 'No aplica' },
                    { _id: '2', rose_type_name: 'Rosa Roja' },
                    { _id: '3', rose_type_name: 'Rosa Mondial' },
                  ]);
                }
              });
            }

            return db;
          },
        }),
  ],
};
