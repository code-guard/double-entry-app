import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleEntryComponent } from './double-entry.component';

describe('DoubleEntryComponent', () => {
    let component: DoubleEntryComponent;
    let fixture: ComponentFixture<DoubleEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DoubleEntryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DoubleEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
