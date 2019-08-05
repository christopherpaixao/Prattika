import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagensPage } from './postagens.page';

describe('PostagensPage', () => {
  let component: PostagensPage;
  let fixture: ComponentFixture<PostagensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagensPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
