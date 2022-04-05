import { TestBed } from '@angular/core/testing';

import { TodolistFirestoreServiceService } from './todolist.firestore.service.service';

describe('Todolist.Firestore.ServiceService', () => {
  let service: TodolistFirestoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodolistFirestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
