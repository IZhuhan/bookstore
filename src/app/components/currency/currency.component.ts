import { Component, OnInit } from '@angular/core';
import { CurrencyService } from "../../services/currency.service";
import { Currency } from "../../models/Currency";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  selectedCurrency: Currency;
  currentCurrencyList: Currency[];

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.currencyService.selectedCurrency.subscribe(data => {
      this.currentCurrencyList = data.slice();
      this.selectedCurrency = Object.create(data.find(obj => obj.isActive));
    });
  }

  updateCurrency() {
    this.currencyService.selectCurrency(this.selectedCurrency.name);
  }
}
