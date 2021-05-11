import { TestBed, inject } from '@angular/core/testing';
import { HotelService } from './hotel.service';
describe('HotelService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [HotelService]
        });
    });
    it('should be created', inject([HotelService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=hotel.service.spec.js.map