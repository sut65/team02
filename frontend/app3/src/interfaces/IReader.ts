import { GenderInterface } from "./IGender";
import { PrefixInterface } from "./IPrefix";

export interface ReaderInterface {
    Email?: string;
    PrefixID?:   number;
	Prefix?: PrefixInterface;
    Name?: string;
    Nickname?: string;
    GenderID?: number;
    Gender?: GenderInterface;
    Date_of_Birth:Date | null;
    Password?: string;
}