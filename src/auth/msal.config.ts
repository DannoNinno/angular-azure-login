import { PublicClientApplication, LogLevel } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const msalConfig = {
  auth: {
    clientId: environment.msalConfig.clientId,
    authority: 'https://login.microsoftonline.com/' + environment.msalConfig.authority,
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
