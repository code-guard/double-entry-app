import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss']
})
export class PrintComponent implements AfterViewInit {
    constructor(
        private router: Router
    ) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            window.print();
        }, 0);
    }

    @HostListener('window:afterprint')
    private onafterprint(): void {
        this.router.navigate(['..']);
    }
}
