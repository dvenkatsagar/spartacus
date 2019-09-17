import { Injectable } from '@angular/core';
import {
  Order,
  OrderCancellation,
  RoutingService,
  UserOrderService,
  OrderCancellationConnector,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor(
    private userOrderService: UserOrderService,
    private routingService: RoutingService,
    private orderCancellationConnector: OrderCancellationConnector
  ) {
    this.orderCode$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.orderCode));

    this.orderLoad$ = this.orderCode$.pipe(
      tap(orderCode => {
        if (orderCode) {
          this.userOrderService.loadOrderDetails(orderCode);
        } else {
          this.userOrderService.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetails())
    );
  }

  isOrderCancellable(order: Order): boolean {
    const cancellableStatuses = ['CANCELLED', 'SHIPPED', 'READY'];
    return (
      cancellableStatuses.find(status => order.status === status) === undefined
    );
  }

  cancelOrder(order: Order): Observable<OrderCancellation> {
    return this.orderCancellationConnector.cancelOrder('spartacus', order.code);
  }
}
