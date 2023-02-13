import { FictionInterface } from "../IFiction";
import { ProblemFictionInterface } from "./IProblemFiction";
import { ReaderInterface } from "../IReader";

export interface ReportFictionInterface {
    ID?: number,
    Timestamp?: Date;
	FictionID?: number;
	Fiction?: FictionInterface;
    ProblemFictionID?: number;
    ProblemFiction?: ProblemFictionInterface;
    ProblemFictionDetail?: string;
	ReaderID?: number;
	Reader?:   ReaderInterface;
    PhoneNumber?: string;
}