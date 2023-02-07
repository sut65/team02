import { EducationInterface } from "./IEducation";
import { GenderInterface } from "./IGender";
import { RoleInterface } from "./IRole";

export interface AdminInterface {
    ID?: number,
    Admin_firstname?: string;
    Admin_lastname?: string;
    Admin_email?: string;
    Admin_password?: string;
    Admin_tel?: string;
    Admin_date_register?: Date | null;

    EducationID?: number;
    Education?: EducationInterface;

    GenderID?: number;
    Gender?: GenderInterface;

    RoleID?: number;
    Role?: RoleInterface;
}