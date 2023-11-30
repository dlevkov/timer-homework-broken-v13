import { TestBed } from '@angular/core/testing';
import { TaskFactoryService } from './task-factory.service';
import { TimerManagerService } from './timer-manager.service';

describe('TaskFactoryService', () => {
  let service: TaskFactoryService;
  let timersService: TimerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(TaskFactoryService);
    timersService = TestBed.inject(TimerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a task with the provided name', () => {
    const name = 'Task 1';
    const task = service.createTask(name);

    expect(task.name).toBe(name);
    expect(service['counter']).toBe(1);
  });

  it('should call playTimer from TimerManagerService', () => {
    jest.spyOn(timersService, 'playTimer');

    service.play(1);

    expect(timersService.playTimer).toHaveBeenCalledWith(1);
  });

  it('should call pauseTimer from TimerManagerService', () => {
    jest.spyOn(timersService, 'pauseTimer');

    service.pause(2);

    expect(timersService.pauseTimer).toHaveBeenCalledWith(2);
  });
});
