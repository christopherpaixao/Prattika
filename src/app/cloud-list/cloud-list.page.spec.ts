import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudListPage } from './cloud-list.page';

describe('CloudListPage', () => {
  let component: CloudListPage;
  let fixture: ComponentFixture<CloudListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
