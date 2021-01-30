import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoubleEntryComponent } from './components/double-entry/double-entry.component';

const routes: Routes = [
    {
        path: '',
        component: DoubleEntryComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
