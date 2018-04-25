import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeTestComponent } from './pipe-test.component';

describe('PipeTestComponent', () => {
  let component: PipeTestComponent;
  let fixture: ComponentFixture<PipeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
