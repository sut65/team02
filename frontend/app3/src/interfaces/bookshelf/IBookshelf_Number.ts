import { ReaderInterface } from "../IReader";

export interface Bookshelf_NumberInterface {
    ID?: number,
    ReaderID?: number,
    Reader?: ReaderInterface,
    Bookshelf_Name?: string,
}