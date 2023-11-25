import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { TimerManagerService } from './timer-manager.service';
import { merge, concat } from 'rxjs';
describe('TimerManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimerManagerService = TestBed.get(TimerManagerService);
    expect(service).toBeTruthy();
  });
  it('should create new timer', (done) => {
    const service: TimerManagerService = TestBed.get(TimerManagerService);
    const sut = service.getTimer(123);
    sut.subscribe((emptyTimer) => {
      expect(emptyTimer).toEqual(service.initialValue);
      done();
    });
  });
  describe('async', () => {
    beforeEach(function () {
      jest.useFakeTimers();
    });

    it('should increment running timer by 3 after 3900ms', (done) => {
      const service: TimerManagerService = TestBed.get(TimerManagerService);
      const sut = service.getTimer(123);
      service.playTimer(123);

      jest.advanceTimersByTime(3900);
      sut.subscribe((emptyTimer) => {
        expect(emptyTimer).toBeGreaterThan(3);
        done();
      });
    });
  });
});
