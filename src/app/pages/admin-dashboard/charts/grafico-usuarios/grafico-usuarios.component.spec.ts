import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoUsuariosComponent } from './grafico-usuarios.component';

describe('GraficoUsuariosComponent', () => {
  let component: GraficoUsuariosComponent;
  let fixture: ComponentFixture<GraficoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
