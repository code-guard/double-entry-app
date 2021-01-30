import { TestBed } from '@angular/core/testing';

import { DataPersistenceServiceService } from './data-persistence-service.service';

describe('DataPersistenceServiceService', () => {
    let service: DataPersistenceServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataPersistenceServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
