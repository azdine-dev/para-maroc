import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifussionMenuComponent } from './difussion-menu.component';

describe('DifussionMenuComponent', () => {
  let component: DifussionMenuComponent;
  let fixture: ComponentFixture<DifussionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifussionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifussionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
