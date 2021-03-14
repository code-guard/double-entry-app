import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

if (environment.production) {
    Sentry.init({
        dsn: 'https://608ab3f97eec429a9c638e87b6b3664a@o551414.ingest.sentry.io/5674858',
        integrations: [
            new Integrations.BrowserTracing({
                tracingOrigins: ['https://my.partitadoppia.app'],
                routingInstrumentation: Sentry.routingInstrumentation,
            }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0.1,
    });

    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
