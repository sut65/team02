import { AdminInterface } from "./IAdmin"
import { WriterInterface } from "./IWriter"
import { FictionInterface } from "./IFiction"

export interface PublicRelationInterface {
    ID?: number;
    Pr_topic?: string;
    Pr_cover?: string;
    Pr_details?: string;
    Pr_time?: Date | null;

    AdminID?: number;
    Admin?: AdminInterface;

    FictionID?: number;
    Fiction?: FictionInterface;

    WriterID?: number;
    Writer?: WriterInterface;
  }