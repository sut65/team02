import { FictionInterface } from "../fiction/IFiction";
import { RatingInterface } from "./IRating";
import { ReaderInterface } from "../IReader";

export interface ReviewInterface {
    ID: number,
    Timestamp: Date;
	FictionID: number;
	Fiction: FictionInterface;
	ReviewTopic: string;
	RatingID: number;
	Rating: RatingInterface;
	ReviewDetail: string;
	ReaderID: number;
	Reader:   ReaderInterface;
}