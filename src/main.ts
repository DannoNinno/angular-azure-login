import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { msalInstance } from './app/service/auth/msal.config';
import { routes } from './app/app.routes';
import { AuthGuard } from './app/guards/auth.guard';
import { provideRouter } from '@angular/router';

async function initializeApp() {
  await msalInstance.initialize(); // Inicializa la instancia de MSAL

  bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), AuthGuard, ...appConfig.providers],
  }).catch((err) => console.error(err));
}

initializeApp();
