import { ReaderInterface } from "../IReader"; 
import { PackageTopUpInterface } from "./IPackage_Top_Up";
import { PaymentTypeInterface } from "./IPayment_Type";
import { ReaderCoinInterface } from "./IReader_Coin";


export interface FictionInterface {
    ID:             number,
    ReaderID:       number;
    Reader:ReaderInterface;
	
    PackageTopUpID:       number;
    PackageTopUp:PackageTopUpInterface;

    PaymentTypeID:       number;
    PaymentType:PaymentTypeInterface;

    Topup_phone_number: string;
    Topup_date:         Date;

    ReaderCoinID:       number;
    ReaderCoin:ReaderCoinInterface;

}