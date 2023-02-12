import { GenreInterface } from "./fiction/IGenre";
import { GenderInterface } from "./IGender";
import { PrefixInterface } from "./IPrefix";

export interface ReaderInterface {
    ID?:number,
    Email?: string,
    PrefixID?:   number,
	Prefix?: PrefixInterface,
    Name?: string,
    ReaderCoin?: number,
    Nickname?: string,
    GenreID?: number;
    Genre?: GenreInterface;
    GenderID?: number,
    Gender?: GenderInterface,
    Date_of_Birth:Date | null,
    Password?: string,
}