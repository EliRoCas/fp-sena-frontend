import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { WebApiEffect, WebApiEffectRegister } from "@ea-controls/ngrx-repository-webapi";


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { docTypeAdapter, roleAdapter, userAdapter } from './services/users.service';

WebApiEffectRegister.register(userAdapter);
WebApiEffectRegister.register(roleAdapter);
WebApiEffectRegister.register(docTypeAdapter);

// Register other adapters as needed

WebApiEffectRegister.configure({
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
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(userAdapter.reducer()),
    provideState(roleAdapter.reducer()),
    provideState(docTypeAdapter.reducer()),
    importProvidersFrom(RouterModule), provideAnimationsAsync(),
    provideEffects(WebApiEffect)
  ],
};
