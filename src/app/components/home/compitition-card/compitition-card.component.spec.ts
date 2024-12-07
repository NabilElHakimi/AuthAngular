import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompititionCardComponent } from './compitition-card.component';

describe('CompititionCardComponent', () => {
  let component: CompititionCardComponent;
  let fixture: ComponentFixture<CompititionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompititionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompititionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
