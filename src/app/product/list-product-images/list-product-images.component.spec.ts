import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductImagesComponent } from './list-product-images.component';

describe('ListProductImagesComponent', () => {
  let component: ListProductImagesComponent;
  let fixture: ComponentFixture<ListProductImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductImagesComponent]
    });
    fixture = TestBed.createComponent(ListProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
