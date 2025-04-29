import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectInvalidRoutesGuard } from './redirect-invalid-routes.guard';

describe('redirectInvalidRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectInvalidRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
