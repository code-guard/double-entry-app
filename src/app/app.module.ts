import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoubleEntryComponent } from './components/double-entry/double-entry.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { MatCardModule } from '@angular/material/card';
import { MainComponent } from './pages/main/main.component';
import { TAccountComponent } from './components/t-account/t-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicDialogComponent } from './components/basic-dialog/basic-dialog.component';
import { BooleanDialogComponent } from './components/boolean-dialog/boolean-dialog.component';
import { ImportDataDialogComponent } from './components/import-data-dialog/import-data-dialog.component';
import { PrintComponent } from './pages/print/print.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';
import { ConfigDialogComponent } from './components/config-dialog/config-dialog.component';

registerLocaleData(localeIt);

@NgModule({
    declarations: [
        AppComponent,
        DoubleEntryComponent,
        MainComponent,
        TAccountComponent,
        BasicDialogComponent,
        BooleanDialogComponent,
        ImportDataDialogComponent,
        PrintComponent,
        InfoDialogComponent,
        ConfigDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        NgSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDialogModule,
        DragDropModule,
        NgxGoogleAnalyticsModule.forRoot('G-M1M05E9LSD'),
        NgxGoogleAnalyticsRouterModule,
        MatTooltipModule,
    ],
    providers: [
        // {
        //     provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        //     useValue: {
        //         duration: 1000,
        //         verticalPosition: 'top',
        //     },
        // },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'it-IT',
        },
        {
            provide: LOCALE_ID,
            useValue: 'it-IT',
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EUR',
        },
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: true,
            }),
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
