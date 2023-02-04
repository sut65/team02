import { WriterInterface } from "../writer/IWriter";
import { GenreInterface } from "./IGenre";
import { RatingFictionInterface } from "./IRatingFiction";

export interface FictionInterface {
    ID?: number;
    Fiction_Name?: string;
    Fiction_Description?: string;
    Fiction_Story?: string;
    Fiction_Date?: Date;
    WriterID?: number;
    Writer?: WriterInterface;
    GenreID?: number;
    Genre?: GenreInterface;
    RatingFictionID?: number;
    RatingFiction?: RatingFictionInterface;

}