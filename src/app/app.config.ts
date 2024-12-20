import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgIdle } from '@ng-idle/core';
import { provideNgIdleKeepalive } from '@ng-idle/keepalive';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    AuthGuard,
    provideHttpClient(),
    provideNgIdle(),
    provideNgIdleKeepalive(),
  ],
};
