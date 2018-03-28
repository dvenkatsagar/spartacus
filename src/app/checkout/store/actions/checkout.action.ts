import { Action } from '@ngrx/store';
import { Address } from '../../models/address-model';

export const ADD_DELIVERY_ADDRESS = '[Checkout] Add Delivery Address';
export const ADD_DELIVERY_ADDRESS_FAIL = '[Checkout] Add Delivery Address Fail';
export const ADD_DELIVERY_ADDRESS_SUCCESS =
  '[Checkout] Add Delivery Address Success';

export const LOAD_SUPPORTED_DELIVERY_MODES =
  '[Checkout] Load Supported Delivery Modes';
export const LOAD_SUPPORTED_DELIVERY_MODES_FAIL =
  '[Checkout] Load Supported Delivery Modes Fail';
export const LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS =
  '[Checkout] Load Supported Delivery Modes Success';
export const SET_DELIVERY_MODE = '[Checkout] Set Delivery Mode';
export const SET_DELIVERY_MODE_FAIL = '[Checkout] Set Delivery Mode Fail';
export const SET_DELIVERY_MODE_SUCCESS = '[Checkout] Set Delivery Mode Success';

export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export class AddDeliveryAddress implements Action {
  readonly type = ADD_DELIVERY_ADDRESS;
  constructor(public payload: any) {}
}

export class AddDeliveryAddressFail implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class AddDeliveryAddressSuccess implements Action {
  readonly type = ADD_DELIVERY_ADDRESS_SUCCESS;
  constructor(public payload: Address) {}
}

export class LoadSupportedDeliveryModes implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class LoadSupportedDeliveryModesFail implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {}
}

export class LoadSupportedDeliveryModesSuccess implements Action {
  readonly type = LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS;
  constructor(public payload: any) {}
}

<<<<<<< HEAD
export class ClearCheckoutStep implements Action {
  readonly type = CLEAR_CHECKOUT_STEP;
  constructor(public payload: number) {}
=======
export class SetDeliveryMode implements Action {
  readonly type = SET_DELIVERY_MODE;
  constructor(
    public payload: { userId: string; cartId: string; selectedModeId: string }
  ) {}
}

export class SetDeliveryModeFail implements Action {
  readonly type = SET_DELIVERY_MODE_FAIL;
  constructor(public payload: any) {}
}

export class SetDeliveryModeSuccess implements Action {
  readonly type = SET_DELIVERY_MODE_SUCCESS;
  constructor(public payload: any) {}
>>>>>>> de4159b63be5aeb8fb27074d96c6a2dba3fddebd
}

export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

export type CheckoutAction =
  | AddDeliveryAddress
  | AddDeliveryAddressFail
  | AddDeliveryAddressSuccess
  | LoadSupportedDeliveryModes
  | LoadSupportedDeliveryModesFail
  | LoadSupportedDeliveryModesSuccess
<<<<<<< HEAD
  | ClearCheckoutStep
=======
  | SetDeliveryMode
  | SetDeliveryModeFail
  | SetDeliveryModeSuccess
>>>>>>> de4159b63be5aeb8fb27074d96c6a2dba3fddebd
  | ClearCheckoutData;
