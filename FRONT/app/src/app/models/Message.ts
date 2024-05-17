import { User } from "./User";

export interface Message {
    [x: string]: any;
    id?: any;
    content: string;
    createdAt?: Date;
    userId:any;
    
  }