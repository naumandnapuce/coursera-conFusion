import { TestBed, inject } from '@angular/core/testing';

import { processHTTPMsgService } from './process-httpmsg.service';

describe('ProcessHttpmsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [processHTTPMsgService]
    });
  });

  it('should be created', inject([processHTTPMsgService], (service: ProcessHttpmsgService) => {
    expect(service).toBeTruthy();
  }));
});
