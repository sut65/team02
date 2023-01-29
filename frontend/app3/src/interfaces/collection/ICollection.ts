import { ReaderInterface } from "../IReader";
//import { BookshelfInterface } from "../IBookshelf"
import { PrivacyInterface } from "./IPrivacy";

export interface CollectionInterface {
    ID: number,
    collection_name: string;
    description: string;
    ReaderID: number;
    Reader: ReaderInterface;
    // BookshelfID: number;
    // Bookshelf: BookshelfInterface;
    PrivacyID: number;
    Privacy: PrivacyInterface;

}
