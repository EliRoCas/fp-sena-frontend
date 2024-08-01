import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { provideRepositoryWebApi } from "@ea-controls/ngrx-repository-webapi";
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { docTypeAdapter, roleAdapter, roleAssignAdapter, userAdapter } from './services/users.service';
import { productAdapter } from './services/products.service';
import { catAdapter } from './services/categories.service';
import { subcatAdapter } from './services/subcategories.service';
import { roseTypeAdapter, transactionAdapter } from './services/transactions.service';
import { budgetAdapter } from './services/budgets.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { UserGuard } from './guards/user-guard.guard';
import { environment } from '../../environment';
import { EntityAdapter } from '@ea-controls/ngrx-repository';
import { provideRepositoryPouchDb } from "@ea-controls/ngrx-repository-pouchdb";

const adapters: EntityAdapter<any>[] = [
  userAdapter,
  roleAdapter,
  docTypeAdapter,
  productAdapter,
  catAdapter,
  subcatAdapter,
  transactionAdapter,
  roseTypeAdapter,
  budgetAdapter,
  roleAssignAdapter
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    ...adapters.map(a => provideState(a.reducer())),
    importProvidersFrom(RouterModule), provideAnimationsAsync(),
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
          return `${environment.urlBase}/${adapter.name}.php`
        },
        removeUrl(adapter, data) {
          return `${environment.urlBase}/${adapter.name}.php?id=${adapter.getId(data)}`
        },
        postUrl(adapter, data) {
          return `${environment.urlBase}/${adapter.name}.php`
        },
        patchUrl(adapter, data) {
          return `${environment.urlBase}/${adapter.name}.php?id=${adapter.getId(data)}`
        },
      })
      : provideRepositoryPouchDb({
        adapters: adapters,
        getIdField: (adapter) => adapter.options.additionalData?.id
      })
  ],
};
