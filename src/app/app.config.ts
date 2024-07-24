import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { WebApiEffect, WebApiEffectRegister } from "@ea-controls/ngrx-repository-webapi";


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { userAdapter } from './services/users.service';

WebApiEffectRegister.register(userAdapter);
// Register other adapters as needed

WebApiEffectRegister.configure({
  urlBase: `http://localhost/sigef-final-proyect/Backend/controller/`,
  getUrl(adapter) {
    return `http://localhost/sigef-final-proyect/Backend/controller/${adapter.name}.php`
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(userAdapter.reducer(
      //add more reducer actions
      //on(....)
    )),
    importProvidersFrom(RouterModule), provideAnimationsAsync(),
    provideEffects(WebApiEffect)
  ],
};
