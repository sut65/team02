import { ReaderInterface } from "../IReader";
import { PriorityInterface } from "./IPriority";
import { Problem_systemInterface } from "./IProblem_system";

export interface FeedbackInterface {
    ID: number;
    Telephone_number: string;
    Detail: string;
    ReaderID: number;
    Reader: ReaderInterface;
    Problem_systemID: number;
    Problem_system: Problem_systemInterface;
    PriorityID: number;
    Priority: PriorityInterface;
}