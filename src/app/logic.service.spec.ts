import { TestBed } from '@angular/core/testing';
import { TaskFactoryService } from './task-factory.service';
import { LogicService } from './logic.service';
import { skip, bufferCount } from 'rxjs/operators';
import { TaskModel } from './models/task-model';
import { of } from 'rxjs';
describe('LogicService', () => {
  let service: LogicService;

  beforeEach(() => {
    const taskModelStub = { id: {}, buttonText: {} };
    const fakeService = {
      createTask: () => ({}),
      pause: () => ({}),
      play: () => ({}),
    };
    TestBed.configureTestingModule({
      providers: [
        LogicService,
        { provide: TaskFactoryService, useValue: fakeService },
      ],
    });
    service = TestBed.inject(LogicService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('initialState defaults to: []', () => {
    expect(service.initialState).toEqual([]);
  });
  it('state increases by one after add one task', (done) => {
    expect.hasAssertions();
    const fake = TestBed.get(TaskFactoryService);
    jest.spyOn(fake, 'createTask').mockReturnValue({ name: 'test1' });

    service.tasks$.pipe(skip(1)).subscribe((x) => {
      expect(x).toContainEqual({ name: 'test1' });
      expect(x.length).toEqual(1);
      done();
    });
    service.addTask('any name');
  });
  it('state increases by 4 after add 4 tasks', (done) => {
    expect.hasAssertions();
    const iterates = 4;
    const fake = TestBed.get(TaskFactoryService);
    jest.spyOn(fake, 'createTask').mockReturnValue({ name: 'test1' });

    service.tasks$.pipe(bufferCount(iterates)).subscribe((x) => {
      expect(x.length).toEqual(iterates);
      done();
    });
    for (let index = 0; index < iterates; index++) {
      service.addTask('any name');
    }
  });

  it('should update task buttonText to play_arrow', (done) => {
    const task = { name: 'test1', id: 0, buttonText: 'pause' } as TaskModel;

    service['state'] = [task];
    service.updateTask(task);

    service.tasks$.subscribe((x) => {
      expect(x[0].buttonText).toEqual('play_arrow');
      done();
    });
  });

  it('should update task buttonText to pause', (done) => {
    const task = { name: 'test1', id: 0, buttonText: 'play_arrow' } as TaskModel;

    service['state'] = [task];
    service.updateTask(task);

    service.tasks$.subscribe((x) => {
      expect(x[0].buttonText).toEqual('pause');
      done();
    });
  });

  it('should return the total time', (done) => {
    const tasks = [
      { name: 'test1', id: 0, buttonText: 'pause', timer: of(10) },
      { name: 'test2', id: 1, buttonText: 'pause', timer: of(20) }
    ] as TaskModel[];

    service.totalTime$.subscribe((x) => {
      expect(x).toEqual(30);
      done();
    });

    service['logicSubj$'].next(tasks);
  });

  it('should return true if name exists', (done) => {
    const tasks = [
      { name: 'test1', id: 0, buttonText: 'pause', timer: of(10) },
      { name: 'test2', id: 1, buttonText: 'pause', timer: of(20) }
    ] as TaskModel[];

    service['state'] = tasks;

    service.nameExists('test1').subscribe((x) => {
      expect(x).toBeTruthy();
      done();
    });
  });

  it('should return false if name not exists', (done) => {
    const tasks = [
      { name: 'test1', id: 0, buttonText: 'pause', timer: of(10) },
      { name: 'test2', id: 1, buttonText: 'pause', timer: of(20) }
    ] as TaskModel[];

    service['state'] = tasks;

    service.nameExists('test3').subscribe((x) => {
      expect(x).toBeFalsy();
      done();
    });
  });
});
