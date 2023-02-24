import { ReaderInterface } from "../IReader";
import { PriorityInterface } from "./IPriority";
import { ProblemSystemInterface } from "./IProblemSystem";

export interface FeedbackInterface {
    ID?: number;
    ReaderID?: number;
    Reader?: ReaderInterface;
    Telephone_Number?: string;
    ProblemSystemID?: number;
    ProblemSystem?: ProblemSystemInterface;
    PriorityID?: number;
    Priority?: PriorityInterface;
    FeedbackDetail?: string;
    Feedback_Date?:Date;
}