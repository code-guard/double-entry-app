import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PrintComponent } from './pages/print/print.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'print',
        component: PrintComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
