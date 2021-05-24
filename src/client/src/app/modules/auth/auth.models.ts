import {BaseModel} from "../shared/model/base.model";

export interface Session {
  id: string;
  user: User;
}


export interface User extends BaseModel {
  userName: string;
}

