import { defaultOmsConfig } from '../config/default-oms-config';
import { ConfigModule } from '../../config/config.module';
import { OmsOrderCancellationAdapter } from './oms-order-cancellation.adapter';
import { OrderCancellationAdapter } from '../../user/connectors/oms/order-cancellation.adapter';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOmsConfig),
  ],
  providers: [
    {
      provide: OrderCancellationAdapter,
      useClass: OmsOrderCancellationAdapter,
    },
  ],
})
export class OrderOmsModule {}
