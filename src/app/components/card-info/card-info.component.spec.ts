import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoComponent } from './card-info.component';

describe('CardInfoComponent', () => {
  let component: CardInfoComponent;
  let fixture: ComponentFixture<CardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve extrair os 4 últimos dígitos do número do cartão com hífens', () => {
    const cardNumber = 'xxxx-xxxx-xxxx-0000';
    const lastFourDigits = component.extractLastFourDigits(cardNumber);
    expect(lastFourDigits).toBe('0000');
  });

  it('deve extrair os 4 últimos dígitos do número do cartão sem hífens', () => {
    const cardNumber = 'xxxxxxxxxxxx0000';
    const lastFourDigits = component.extractLastFourDigits(cardNumber);
    expect(lastFourDigits).toBe('0000');
  });
});
