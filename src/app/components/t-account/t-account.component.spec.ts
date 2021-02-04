import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAccountComponent } from './t-account.component';

describe('TAccountComponent', () => {
    let component: TAccountComponent;
    let fixture: ComponentFixture<TAccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TAccountComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
