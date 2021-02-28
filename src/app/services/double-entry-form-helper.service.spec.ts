import { TestBed } from '@angular/core/testing';

import { DoubleEntryFormHelperService } from './double-entry-form-helper.service';

describe('DoubleEntryFormHelperService', () => {
    let service: DoubleEntryFormHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DoubleEntryFormHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
