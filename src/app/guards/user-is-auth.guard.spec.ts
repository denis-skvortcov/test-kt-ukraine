import { TestBed, async, inject } from '@angular/core/testing';

import { UserIsAuthGuard } from './user-is-auth.guard';

describe('UserIsAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIsAuthGuard]
    });
  });

  it('should ...', inject([UserIsAuthGuard], (guard: UserIsAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
