import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class BinanceService {
  private readonly binanceUrl = 'https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT';
  private bitcoinPrice: any = null;
  private readonly serviceFee: number;
  private readonly refreshRate: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceFee =
      Number(this.configService.get('SERVICE_FEE', '0.01')) / 100;
    this.refreshRate = Number(this.configService.get('REFRESH_RATE', '10000'));

    this.updatePrice();
    setInterval(() => {
      this.updatePrice();
    }, this.refreshRate);
  }

  private async updatePrice() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(this.binanceUrl),
      );
      this.bitcoinPrice = this.calculatePriceWithFee(data);
    } catch (error) {
      console.error('Ошибка при получении цены Bitcoin:', error.message);
    }
  }

  private calculatePriceWithFee(data: any) {
    const bidPrice = parseFloat(data.bidPrice);
    const askPrice = parseFloat(data.askPrice);

    const bidPriceWithFee = bidPrice * (1 - this.serviceFee);
    const askPriceWithFee = askPrice * (1 + this.serviceFee);

    const midPrice = (bidPriceWithFee + askPriceWithFee) / 2;

    return {
      bidPrice: bidPriceWithFee,
      askPrice: askPriceWithFee,
      midPrice,
    };
  }

  getBitcoinPrice() {
    return this.bitcoinPrice;
  }
}