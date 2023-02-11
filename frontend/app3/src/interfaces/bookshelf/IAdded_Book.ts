import { Bookshelf_NumberInterface } from "./IBookshelf_Number";
import { FictionInterface } from "../fiction/IFiction";

export interface Added_BookInterface {
    ID?: number;
    Bookshelf_NumberID?: number;
    Bookshelf_Number?: Bookshelf_NumberInterface;
    FictionID?: number;
    FictionInterface?: FictionInterface;
}