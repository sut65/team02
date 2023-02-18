import { AdminInterface } from "./IAdmin"
import { FictionInterface } from "./IFiction"
import { PRCategoryInterface } from "./IPRCategory";

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

    PR_categoryID?: number;
    PR_category?: PRCategoryInterface
  }