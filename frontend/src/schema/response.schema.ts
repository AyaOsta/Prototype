import { UserSchema } from "./user.schema";
import { QuestionSchema } from "./question.schema";
import { BaseSchema } from "./base.schema";

export interface ResponseSchema extends BaseSchema {
  user: number | UserSchema;
  question: number | QuestionSchema;
  text: string;
}
