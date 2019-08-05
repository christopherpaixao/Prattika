import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarcontaPage } from './criarconta.page';

describe('CriarcontaPage', () => {
  let component: CriarcontaPage;
  let fixture: ComponentFixture<CriarcontaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarcontaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarcontaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
