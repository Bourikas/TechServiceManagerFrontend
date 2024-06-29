export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }
  
  export interface Credentials {
    email: string;
    password: string;
  }
  
  export interface LoggedInUser {
    id: number;
    username: string;
    
  }