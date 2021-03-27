import { TestBed } from '@angular/core/testing';

import { ToggleVariationConfigService } from './toggle-variation-config.service';

describe('ToggleVariationConfigService', () => {
    let service: ToggleVariationConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToggleVariationConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
