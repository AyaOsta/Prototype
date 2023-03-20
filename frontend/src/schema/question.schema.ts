import { BaseSchema } from "./base.schema";

export interface QuestionSchema extends BaseSchema {
  text: string;
  next?: number | QuestionSchema;
}
