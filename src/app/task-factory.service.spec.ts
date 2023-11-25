import { TestBed } from '@angular/core/testing';
import { TaskFactoryService } from './task-factory.service';

describe('TaskFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFactoryService = TestBed.get(TaskFactoryService);
    expect(service).toBeTruthy();
  });
});
