export interface Technician {
    id : number;
    user_id : string;
    first_name : string;
    last_name : string;
    email : string;
    bio? : string;
    shop? : string;
    password: string;
    password_confirm: string;
}

export interface LoggedInTechnician {
    id: number;
    user_id : string;
    first_name : string;
    last_name : string;
    email : string;
}