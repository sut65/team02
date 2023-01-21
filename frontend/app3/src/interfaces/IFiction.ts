import { WriterInterface } from "./IWriter";
import { GenreInterface } from "./IGenre";
import { TypeInterface } from "./IType";

export interface FictionInterface {
    ID:             number,
    F_name:         string;
    F_Description:  string;
    F_File:         string;
	F_Date:         Date;
    WriterID:       number;
    Writer:WriterInterface;
    GenreID:       number;
    Genre:GenreInterface;
    TypeID:       number;
    Type:TypeInterface;

    // F_Date:         string;
    // WriterID:       number;
    // Writer:string;
    // GenreID:       number;
    // Genre:string;
    // TypeID:       number;
    // Type:string;
}