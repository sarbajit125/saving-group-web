import { PaymentInstrument, CardPaymentInstrument, InstrumentType } from '../models/uiModels';

export const isCardInstruments = (objs: PaymentInstrument[]): objs is CardPaymentInstrument[] =>
objs.every((obj) => obj.instrumentType === InstrumentType.card);
