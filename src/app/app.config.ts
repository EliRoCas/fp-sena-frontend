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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(userAdapter.reducer()),
    provideState(roleAdapter.reducer()),
    provideState(docTypeAdapter.reducer()),
    provideState(productAdapter.reducer()),
    provideState(catAdapter.reducer()),
    provideState(subcatAdapter.reducer()),
    provideState(transactionAdapter.reducer()),
    provideState(roseTypeAdapter.reducer()),
    provideState(budgetAdapter.reducer()),
    provideState(roleAssignAdapter.reducer()),
    importProvidersFrom(RouterModule), provideAnimationsAsync(),
    importProvidersFrom(HttpClient),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CookieService,
    AuthService,
    UserGuard,
    provideRepositoryWebApi({
      adapters: [
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
      ],
      urlBase: `http://localhost/sigef-final-proyect/Backend/controller/`,
      getUrl(adapter) {
        return `http://localhost/sigef-final-proyect/Backend/controller/${adapter.name}.php`
      },
      removeUrl(adapter, data) {
        return `http://localhost/sigef-final-proyect/Backend/controller/${adapter.name}.php?id=${adapter.getId(data)}`
      },

      postUrl(adapter, data) {
        return `http://localhost/sigef-final-proyect/Backend/controller/${adapter.name}.php`
      },
      patchUrl(adapter, data) {
        return `http://localhost/sigef-final-proyect/Backend/controller/${adapter.name}.php?id=${adapter.getId(data)}`
      },
    })
  ],
};
