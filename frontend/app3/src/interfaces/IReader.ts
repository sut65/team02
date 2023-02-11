import { GenderInterface } from "./IGender";
import { PrefixInterface } from "./IPrefix";
import { ReaderCoinInterface } from "../interfaces/topup/IReaderCoin";

export interface ReaderInterface {
    ID?:number,
    Email?: string,
    PrefixID?:   number,
	Prefix?: PrefixInterface,
    Name?: string,
    Nickname?: string,
    GenderID?: number,
    Gender?: GenderInterface,
    Date_of_Birth:Date | null,
    Password?: string,
    ReaderCoinID?: number;
    ReaderCoin?: ReaderCoinInterface;
}