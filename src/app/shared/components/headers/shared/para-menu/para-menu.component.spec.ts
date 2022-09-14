import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaMenuComponent } from './para-menu.component';

describe('ParaMenuComponent', () => {
  let component: ParaMenuComponent;
  let fixture: ComponentFixture<ParaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
