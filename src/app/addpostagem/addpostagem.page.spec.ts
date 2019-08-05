import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostagemPage } from './addpostagem.page';

describe('AddpostagemPage', () => {
  let component: AddpostagemPage;
  let fixture: ComponentFixture<AddpostagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpostagemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpostagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
