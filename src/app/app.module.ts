import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoubleEntryComponent } from './components/double-entry/double-entry.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainComponent } from './pages/main/main.component';
import { TAccountComponent } from './components/t-account/t-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicDialogComponent } from './components/basic-dialog/basic-dialog.component';
import { BooleanDialogComponent } from './components/boolean-dialog/boolean-dialog.component';
import { ImportDataDialogComponent } from './components/import-data-dialog/import-data-dialog.component';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatTabsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        NgSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 1000,
                verticalPosition: 'top',
            },
        },
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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
