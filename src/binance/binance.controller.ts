import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('price')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('bitcoin')
  async getBitcoinPrice() {
    const price = this.binanceService.getBitcoinPrice();
    if (!price) {
      return { message: 'Цена Bitcoin временно недоступна. Попробуйте позже.' };
    }
    return price;
  }
}