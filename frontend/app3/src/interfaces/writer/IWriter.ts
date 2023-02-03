import { PrefixInterface } from "./IPrefix";
import { GenderInterface } from "./IGender";
import { AffiliationInterface } from "./IAffiliation";

export interface WriterInterface {
    ID:                 number,
    Prefix:             string,
    Name:               string,
    Gender:             string,
    Writer_birthday:    Date,
    Affiliation:        string,
    Email:              string,
    Password:           string,
}