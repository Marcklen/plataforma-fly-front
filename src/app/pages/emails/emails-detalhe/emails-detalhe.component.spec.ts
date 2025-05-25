import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsDetalheComponent } from './emails-detalhe.component';

describe('EmailsDetalheComponent', () => {
  let component: EmailsDetalheComponent;
  let fixture: ComponentFixture<EmailsDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailsDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
