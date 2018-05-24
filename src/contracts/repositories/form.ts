import { Form } from "../../domain";
import { LoggedInUser } from "../interfaces";
import { UpdateResult, FormInterface } from "../infra";

export interface FormRepository {
  delete: (id: string, user: LoggedInUser) => Promise<UpdateResult>;
  getByWorkstation: (workstation: string) => Promise<FormInterface[]>;
  updateContent: (id: string, content: string) => Promise<UpdateResult>;
  disable: (id: string) => Promise<UpdateResult>;
  add: (form: Form) => Promise<Form>;
}
