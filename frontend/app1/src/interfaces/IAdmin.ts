import { ExecutiveInterface } from "./IExecutiveAdmin"
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
    Admin_salary?: number;
    Admin_birthday?: Date | null;
    Admin_date_register?: Date | null;

    ExecutiveAdminID?: number;
    ExecutiveAdmin?: ExecutiveInterface;

    EducationID?: number;
    Education?: EducationInterface;

    GenderID?: number;
    Gender?: GenderInterface;

    RoleID?: number;
    Role?: RoleInterface;
}