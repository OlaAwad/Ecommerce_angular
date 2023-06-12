import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoomDialogComponent } from './image-zoom-dialog.component';

describe('ImageZoomDialogComponent', () => {
  let component: ImageZoomDialogComponent;
  let fixture: ComponentFixture<ImageZoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageZoomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
