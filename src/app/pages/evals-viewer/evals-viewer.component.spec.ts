import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalsViewerComponent } from './evals-viewer.component';

describe('EvalsViewerComponent', () => {
  let component: EvalsViewerComponent;
  let fixture: ComponentFixture<EvalsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalsViewerComponent]
    });
    fixture = TestBed.createComponent(EvalsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
