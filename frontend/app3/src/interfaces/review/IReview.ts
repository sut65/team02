import { FictionInterface } from "../IFiction";
import { RatingInterface } from "./IRating";
import { ReaderInterface } from "../IReader";

export interface ReviewInterface {
    ID: number,
    Timestamp: Date;
	Fiction: FictionInterface;
	ReviewTopic: string;
	Rating: RatingInterface;
	ReviewDetail: string;
	Reader:   ReaderInterface;
}