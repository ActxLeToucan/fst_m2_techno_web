import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTruckComponent } from './list-truck.component';

describe('ListTruckComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
