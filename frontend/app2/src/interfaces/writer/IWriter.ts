import { PrefixInterface } from "./IPrefix";
import { GenderInterface } from "./IGender";
import { AffiliationInterface } from "./IAffiliation";

export interface WriterInterface {
    [x: string]: any;
    ID?:                 number;
    PrefixID?:           number;
    Prefix?:             PrefixInterface;
    Name?:               string;
    GenderID?:           number;
    Gender?:             GenderInterface;
    Writer_birthday?:    Date | null;
    AffiliationID?:      number;
    Affiliation?:        AffiliationInterface;
    Pseudonym?:          string;
    Email?:              string;
    Password?:           string;
}