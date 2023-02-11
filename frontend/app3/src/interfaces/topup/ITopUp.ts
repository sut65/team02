import { ReaderInterface } from "../IReader"; 
import { PackageTopUpInterface } from "./IPackageTopUp";
import { PaymentTypeInterface } from "./IPaymentType";
import { ReaderCoinInterface } from "./IReaderCoin";
import dayjs, { Dayjs } from "dayjs";


export interface TopUpInterface {
    ID?:             number,
    ReaderID?:       number;
    Reader?:ReaderInterface;
	
    PackageTopUpID?:       number;
    PackageTopUp?:PackageTopUpInterface;

    PaymentTypeID?:       number;
    PaymentType?:PaymentTypeInterface;

    Topup_phone_number?: string;
    Topup_date?:       dayjs.Dayjs | null;
    Note?:             string;

    ReaderCoinID?:       number;
    ReaderCoin?:ReaderCoinInterface;
}