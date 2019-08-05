import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpostagemPage } from './editpostagem.page';

describe('EditpostagemPage', () => {
  let component: EditpostagemPage;
  let fixture: ComponentFixture<EditpostagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpostagemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpostagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
