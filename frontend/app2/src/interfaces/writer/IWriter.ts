import { PrefixInterface } from "./IPrefix";
import { GenderInterface } from "./IGender";
import { AffiliationInterface } from "./IAffiliation";

export interface WriterInterface {
<<<<<<< HEAD
    ID:                 number;
    PrefixID:           number;
    Prefix:             PrefixInterface;
    Name:               string;
    GenderID:           number;
    Gender:             GenderInterface;
    Writer_birthday:    Date;
    AffiliationID:      number;
    Affiliation:        AffiliationInterface;
    Pseudonym?:          string;
    Email:              string;
    Password:           string;
=======
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
>>>>>>> 18b18adba45e1e2aaa74a396fcfd7ddaf2565b34
}