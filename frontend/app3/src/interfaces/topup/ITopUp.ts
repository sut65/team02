import { ReaderInterface } from "../IReader"; 
import { PackageTopUpInterface } from "./IPackageTopUp";
import { PaymentTypeInterface } from "./IPaymentType";
import { ReaderCoinInterface } from "./IReaderCoin";


export interface TopUpInterface {
    ID?:             number,
    ReaderID?:       number;
    Reader?:ReaderInterface;
	
    PackageTopUpID?:       number;
    PackageTopUp?:PackageTopUpInterface;

    PaymentTypeID?:       number;
    PaymentType?:PaymentTypeInterface;

    Topup_phone_number?: string;
    Topup_date?:         Date;

    ReaderCoinID?:       number;
    ReaderCoin?:ReaderCoinInterface;

}