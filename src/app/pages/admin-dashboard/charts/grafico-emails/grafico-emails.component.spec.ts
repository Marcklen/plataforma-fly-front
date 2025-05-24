import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEmailsComponent } from './grafico-emails.component';

describe('GraficoEmailsComponent', () => {
  let component: GraficoEmailsComponent;
  let fixture: ComponentFixture<GraficoEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
