import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalsUploaderComponent } from './evals-uploader.component';

describe('EvalsUploaderComponent', () => {
  let component: EvalsUploaderComponent;
  let fixture: ComponentFixture<EvalsUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalsUploaderComponent]
    });
    fixture = TestBed.createComponent(EvalsUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
