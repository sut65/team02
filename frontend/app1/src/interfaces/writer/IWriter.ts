import { PrefixInterface } from "./IPrefix";
import { GenderInterface } from "./IGender";
import { AffiliationInterface } from "./IAffiliation";

export interface WriterInterface {
    ID?:                 number;
    PrefixID?:           number;
    Prefix?:             PrefixInterface;
    Name?:               string;
    GenderID?:           number;
    Gender?:             GenderInterface;
    Writer_birthday?:    Date;
    AffiliationID?:      number;
    Affiliation?:        AffiliationInterface;
    Pseudonym?:          string;
    Email?:              string;
    Password?:           string;
}