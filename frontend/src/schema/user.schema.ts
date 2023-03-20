import { BaseSchema } from "./base.schema";

export interface UserSchema extends BaseSchema {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  created_at: Date;
  updated_at: Date;
}
